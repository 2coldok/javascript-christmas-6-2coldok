import Supervisor from "../src/domain/Supervisor.js";

describe('Supervisor 클래스 단위테스트', () => {
  test('날짜가 담긴 Event클래스를 필드에 잘 추가하는지 테스트', () => {
    const DATE = '10';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    const SPECIAL_DISCOUNT_PRICE = 1000;
    
    expect(supervisor.event().specialDiscount()).toEqual(SPECIAL_DISCOUNT_PRICE);
  });

  test('메뉴가 담긴 Cashier클래스를 필드에 잘 추가하는지 테스트', () => {
    const MENU = '바비큐립-2,크리스마스파스타-3,티본스테이크-1,샴페인-2';
    const supervisor = new Supervisor();
    supervisor.menuUpload(MENU);
    const TOTAL_TYPE_QUANTITY = 6;

    expect(supervisor.cashier().totalTypeQuantity('main')).toEqual(TOTAL_TYPE_QUANTITY);
  });

  test('혜택내역을 잘 계산해 주는지 테스트 1', () => {
    const DATE = '10';
    const MENU = '바비큐립-2,크리스마스파스타-3,티본스테이크-1,아이스크림-3,초코케이크-2';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);
    const map = new Map();
    map
      .set('christmas', 1000 + (10 - 1) * 100)
      .set('weekday', 5 * 2023)
      .set('weekend', 0)
      .set('special', 1000)
      .set('freebie', 25000)
      .set('condition', true);

    const BENEFITS_LIST = map;

    expect(supervisor.benefitList()).toEqual(BENEFITS_LIST);
  });

  test('혜택내역을 잘 계산해 주는지 테스트 2', () => {
    const DATE = '24';
    const MENU = '아이스크림-20';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);
    const map = new Map();
    map
      .set('christmas', 1000 + (24 - 1) * 100)
      .set('weekday', 20 * 2023)
      .set('weekend', 0)
      .set('special', 1000)
      .set('freebie', 0)
      .set('condition', true);

    const BENEFITS_LIST = map;

    expect(supervisor.benefitList()).toEqual(BENEFITS_LIST);
  });

  test('해택내역을 잘 계산해 주는지 테스트 3', () => {
    const DATE = '3';
    const MENU = 
    '양송이수프-1,타파스-1,시저샐러드-1,' +
    '티본스테이크-1,바비큐립-1,해산물파스타-1,크리스마스파스타-1,' +
    '초코케이크-1,아이스크림-1,제로콜라-1,레드와인-1,샴페인-1';

    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);
    const map = new Map();
    map
      .set('christmas', 1000 + (3 - 1) * 100)
      .set('weekday', 2 * 2023)
      .set('weekend', 0)
      .set('special', 1000)
      .set('freebie', 25000)
      .set('condition', true);

    const BENEFITS_LIST = map;

    expect(supervisor.benefitList()).toEqual(BENEFITS_LIST);
  });

  test('총 혜택 금액을 잘 계산하는지 테스트', () => {
    const DATE = '31';
    const MENU = 
    '양송이수프-1,타파스-1,시저샐러드-1,' + 
    '티본스테이크-1,바비큐립-1,해산물파스타-1,크리스마스파스타-1,' + 
    '초코케이크-1,아이스크림-1,제로콜라-1,레드와인-1,샴페인-1';

    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);
    
    const CHRISTMAS_DISCOUNT = 0;
    const WEEKDAY_DISCOUNT = 2 * 2023;
    const WEEKEND_DISCOUNT = 0;
    const SPECIAL_DISCOUNT = 1000;
    const FREEBIE_DISCOUNT = 25000;

    const TOTAL_DISCOUNT_AMOUNT = 
      CHRISTMAS_DISCOUNT + 
      WEEKDAY_DISCOUNT + 
      WEEKEND_DISCOUNT + 
      SPECIAL_DISCOUNT + 
      FREEBIE_DISCOUNT;

    expect(supervisor.totalBenefitAmount()).toEqual(TOTAL_DISCOUNT_AMOUNT);
  });

  test('최종 결제 금액을 잘 계산하는지 테스트', () => {
    const DATE = '30';
    const MENU = '크리스마스파스타-15,샴페인-4,아이스크림-1';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);

    const TOTAL_ORDER_PRICE = (15 * 25000) + (4 * 25000) + (1 * 5000);
    const TOTAL_DISCOUNT_PRICE = 0 + 0 + (2023 * 15) + 0;
    const FINAL_PAYMENT_PRICE = TOTAL_ORDER_PRICE - TOTAL_DISCOUNT_PRICE;

    expect(supervisor.finalPaymentAmount()).toEqual(FINAL_PAYMENT_PRICE);
  });

  test('혜택 금액에 해당하는 등급의 뱃지를 수여하는지 테스트 1', () => {
    const DATE = '26';
    const MENU = '티본스테이크-10';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);

    const BADGE = '산타';
    
    expect(supervisor.giveBadge()).toEqual(BADGE);
  });

  test('혜택 금액에 해당하는 등급의 뱃지를 수여하는지 테스트 2', () => {
    const DATE = '26';
    const MENU = '티본스테이크-1,아이스크림-1,초코케이크-1,크리스마스파스타-1';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);

    const BADGE = '없음';

    expect(supervisor.giveBadge()).toEqual(BADGE);
  });

  test('혜택 금액에 해당하는 등급의 뱃지를 수여하는지 테스트 3', () => {
    const DATE = '6';
    const MENU = '아이스크림-3';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);

    const BADGE = '별';
    
    expect(supervisor.giveBadge()).toEqual(BADGE);
  });

  test('혜택 금액에 해당하는 등급의 뱃지를 수여하는지 테스트 4', () => {
    const DATE = '6';
    const MENU = '아이스크림-5';
    const supervisor = new Supervisor();
    supervisor.dateUpload(DATE);
    supervisor.menuUpload(MENU);

    const BADGE = '트리';
    
    expect(supervisor.giveBadge()).toEqual(BADGE);
  });
});
