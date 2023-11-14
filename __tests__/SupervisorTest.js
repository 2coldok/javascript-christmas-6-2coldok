import Supervisor from "../src/domain/Supervisor.js";

describe('Supervisor 클래스 단위테스트', () => {
  test('날짜가 담긴 Event클래스를 필드에 잘 추가하는지 테스트', () => {
    const date = '10';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    const result = 1000;
    
    expect(supervisor.event().specialDiscount()).toEqual(result);
  });

  test('메뉴가 담긴 Cashier클래스를 필드에 잘 추가하는지 테스트', () => {
    const menu = '바비큐립-2,크리스마스파스타-3,티본스테이크-1,샴페인-2';
    const supervisor = new Supervisor();
    supervisor.menuUpload(menu);
    const result = 6;

    expect(supervisor.cashier().totalTypeQuantity('main')).toEqual(result);
  });

  test('혜택내역을 잘 계산해 주는지 테스트 1', () => {
    const date = '10';
    const menu = '바비큐립-2,크리스마스파스타-3,티본스테이크-1,아이스크림-3,초코케이크-2';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);
    const map = new Map();
    map
    .set('christmas', 1000 + (10 - 1) * 100)
    .set('weekday', 5 * 2023)
    .set('weekend', 0)
    .set('special', 1000)
    .set('freebie', 25000)
    .set('condition', true);

    const result = map;

    expect(supervisor.benefitList()).toEqual(result);
  });

  test('혜택내역을 잘 계산해 주는지 테스트 2', () => {
    const date = '24';
    const menu = '아이스크림-20';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);
    const map = new Map();
    map
    .set('christmas', 1000 + (24 - 1) * 100)
    .set('weekday', 20 * 2023)
    .set('weekend', 0)
    .set('special', 1000)
    .set('freebie', 0)
    .set('condition', true);

    const result = map;

    expect(supervisor.benefitList()).toEqual(result);
  });

  test('해택내역을 잘 계산해 주는지 테스트 3', () => {
    const date = '3';
    const menu = '양송이수프-1,타파스-1,시저샐러드-1,티본스테이크-1,바비큐립-1,해산물파스타-1,크리스마스파스타-1,초코케이크-1,아이스크림-1,제로콜라-1,레드와인-1,샴페인-1';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);
    const map = new Map();
    map
    .set('christmas', 1000 + (3 - 1) * 100)
    .set('weekday', 2 * 2023)
    .set('weekend', 0)
    .set('special', 1000)
    .set('freebie', 25000)
    .set('condition', true);

    const reuslt = map;

    expect(supervisor.benefitList()).toEqual(reuslt);
  });

  test('총 혜택 금액을 잘 계산하는지 테스트', () => {
    const date = '31';
    const menu = '양송이수프-1,타파스-1,시저샐러드-1,티본스테이크-1,바비큐립-1,해산물파스타-1,크리스마스파스타-1,초코케이크-1,아이스크림-1,제로콜라-1,레드와인-1,샴페인-1';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);
    
    const christmasDiscount = 0;
    const weekdayDiscount = 2 * 2023;
    const weekendDiscount = 0;
    const specialDiscount = 1000;
    const freebieDiscount = 25000;
    const result = christmasDiscount + weekdayDiscount + weekendDiscount + specialDiscount + freebieDiscount;

    expect(supervisor.totalBenefitAmount()).toEqual(result);
  });

  test('최종 결제 금액을 잘 계산하는지 테스트', () => {
    const date = '30';
    const menu = '크리스마스파스타-15,샴페인-4,아이스크림-1';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);

    const totalOrderPrice = (15 * 25000) + (4 * 25000) + (1 * 5000);
    const totalDiscountPrice = 0 + 0 + (2023 * 15) + 0;
    const result = totalOrderPrice - totalDiscountPrice;

    expect(supervisor.finalPaymentAmount()).toEqual(result);
  });

  test('혜택 금액에 해당하는 등급의 뱃지를 수여하는지 테스트 1', () => {
    const date = '26';
    const menu = '티본스테이크-10';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);

    const result = '산타';
    
    expect(supervisor.giveBadge()).toEqual(result);
  });

  test('혜택 금액에 해당하는 등급의 뱃지를 수여하는지 테스트 2', () => {
    const date = '26';
    const menu = '티본스테이크-1,아이스크림-1,초코케이크-1,크리스마스파스타-1';
    const supervisor = new Supervisor();
    supervisor.dateUpload(date);
    supervisor.menuUpload(menu);

    const reuslt = '없음';

    expect(supervisor.giveBadge()).toEqual(reuslt);
  });
});
