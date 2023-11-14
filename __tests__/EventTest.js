import Event from "../src/domain/Event.js";

describe('이벤트 관리자 Event 클래스 테스트', () => {
  test.each([['0'], ['-25'], ['1.1'] ['32']])('1부터 31 사이의 자연수가 아닐시 예외처리', (input) => {
    expect(() => {
      const event = new Event(input);
      event.date()
    }).toThrow('[ERROR]');
  });

  test.each([['a'], ['!'], [' '], ['3a'], ['가']])('숫자 이외의 공백을 포함한 문자 예외처리', (input) => {
    expect(() => {
      const event = new Event(input);
      event.date();
    }).toThrow('[ERROR]');
  });

  test('날짜를 숫자형으로 불러오는 기능 테스트', () => {
    const event = new Event('25');
    
    expect(event.date()).toEqual(25)
  });

  test.each([['26'], ['27'], ['28'], ['29'], ['30'], ['31']])('크리스마스D-Day 할인금액은 25일 이후 0원', (input) => {
    const event = new Event(input);

    expect(event.christmasDDayDiscount()).toEqual(0);
  });

  test('[크리스마스DDAY할인메서드] 25일까지 적용되는 크리스마스D-Day 할인금액은 1000 + (date-1)*100 원', () => {
    const DATE = '25';
    const event = new Event(DATE);
    const RESULT = 1000 + (25 - 1) * 100;

    expect(event.christmasDDayDiscount()).toEqual(RESULT);
  });
  
  test.each([['1'],['2'],['22'],['23'],['29'],['30']])('[평일할인메서드]평일 할인 금액은 주말인 금,토 요일에 0원', (input) => {
    const event = new Event(input)
    const DESERT_AMOUNT = 10;

    expect(event.weekdayDiscount(DESERT_AMOUNT)).toEqual(0);
  });

  test('[평일할인메서드]평일에는 디저트 개수 * 2023의 평일할인 금액 테스트', () => {
    const DESERT_AMOUNT = 3;
    const event = new Event('25');
    const RESULT = 2023 * 3;

    expect(event.weekdayDiscount(DESERT_AMOUNT)).toEqual(RESULT);    
  });

  test('[평일할인메서드] 평일이라도 디저트 수량이 0 이면 평일할인 금액은 0원', () => {
    const DESERT_AMOUNT = 0;
    const event = new Event('5');

    expect(event.weekdayDiscount(DESERT_AMOUNT)).toEqual(0);
  });

  test.each([['4'], ['12'], ['25'], ['28']])('[주말할인메서드] 평일에는 주말 할인 금액 0원', (input) => {
    const MAIN_AMOUNT = 10;
    const event = new Event(input);

    expect(event.weekendDiscount(MAIN_AMOUNT)).toEqual(0);
  });

  test.each([['1'], ['2'], ['22']])('[주말할인메서드] 주말 일지라도 메인요리 수량이 0일시 주말 할인 금액은 0원', (input) => {
    const MAIN_AMOUNT = 0;
    const event = new Event(input)
    
    expect(event.weekendDiscount(MAIN_AMOUNT)).toEqual(0);
  });

  test('[주말할인메서드] 주말에는 메인요리수량 * 2023원 할인적용', () => {
    const MAIN_AMOUNT = 3;
    const RESULT = 3 * 2023;
    const event = new Event('22');

    expect(event.weekendDiscount(MAIN_AMOUNT)).toEqual(RESULT);
  });

  test.each([['3'], ['10'], ['17'], ['24'], ['31'], ['25']])('[스페셜할인메서드] 특별한 날짜에 대해서 1000원 할인적용 테스트', (input) => {
    const RESULT = 1000;
    const event = new Event(input);

    expect(event.specialDiscount()).toEqual(RESULT);
  });

  test.each([['1'], ['23'], ['11'], ['27']])('[스패셜할인메서드] 특별한 날이 아닌 날에 대해선 할인금액 0원', (input) => {
    const RESULT = 0;
    const event = new Event(input);

    expect(event.specialDiscount()).toEqual(RESULT);
  });

  test('[사은품금액메서드]총 주문액이 12만원 이상일시 2만5천원 할인적용 보여주기', () => {
    const TOTAL_FOODS_PRICE_BEFORE_DISCOUNT = 120000;
    const RESULT = 25000;
    const event = new Event('1');

    expect(event.freebieDiscount(TOTAL_FOODS_PRICE_BEFORE_DISCOUNT)).toEqual(RESULT);
  });

  test('[사은품금액메서드]총 주문액이 12만원 미만이면 0원 처리', () => {
    const TOTAL_FOODS_PRICE_BEFORE_DISCOUNT = 119999;
    const RESULT = 0;
    const event = new Event('25');

    expect(event.freebieDiscount(TOTAL_FOODS_PRICE_BEFORE_DISCOUNT)).toEqual(RESULT);
  });

  test('[이벤트참여가능여부메서드] 총 주문액 만원 이상부터 true 반환', () => {
    const TOTAL_FOODS_PRICE_BEFORE_DISCOUNT = 10002;
    const RESULT = true;
    const event = new Event('24');

    expect(event.condition(TOTAL_FOODS_PRICE_BEFORE_DISCOUNT)).toEqual(RESULT);
  });

  test('[이벤트참여가능여부메서드] 총 주문액 만원 미만부터 false 반환', () => {
    const TOTAL_FOODS_PRICE_BEFORE_DISCOUNT = 9999;
    const RESULT = false;
    const event = new Event('31');

    expect(event.condition(TOTAL_FOODS_PRICE_BEFORE_DISCOUNT)).toEqual(RESULT);
  });

  let badgeIndex = 0;
  test.each([[4999], [5000], [12000], [21000]])('[벳지수여메서드] 해택받은 금액에 따라 뱃지 수여', (totalBenefitAmount) => {
    const BADGE_RESULT = ['없음', '별', '트리', '산타'];
    const event = new Event('22');

    expect(event.getBadge(totalBenefitAmount)).toEqual(BADGE_RESULT[badgeIndex]);
    badgeIndex += 1;
  });
});
