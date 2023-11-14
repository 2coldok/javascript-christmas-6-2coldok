import Cashier from "../src/domain/Cashier.js";

describe('Cashier 클래스 유효성 테스트', () => {
  test.each([
    ['제로콜라-10'],
    ['제로콜라-2,샴페인-4'],
    ['샴페인-3,레드와인-1,제로콜라-2']
  ])('음료만 주문시 예외처리', (input) => {
    expect(() => new Cashier(input)).toThrow('[ERROR');
  });

  test.each([
    ['아이스크림-3,초코케이크-4,아이스크림-1'],
    ['티본스테이크-3,바비큐립-4,양송이수프-3,양송이수프-1'],
    ['시저샐러드-1,제로콜라-1,제로콜라-1,시저샐러드-4,크리스마스파스타-1']
  ])('주문한 음식 이름이 중복되면 예외처리', (input) => {
    expect(() => new Cashier(input)).toThrow('[ERROR]');
  });

  test.each([
    ['제로콜라-21'],
    ['샴페인-3,양송이수프-10,시저셀러드-8,아이스크림-10'],
    ['티본스테이크-22,레드와인-1']
  ])('주문 수량이 20 초과시 예외처리', (input) => {
    expect(() => new Cashier(input)).toThrow('[ERROR]');
  });

  test.each([
    ['제로콜라-1,아이스크림-19'],
    ['티본스테이크-20'],
    ['시저샐러드-3,양송이수프-15,레드와인-2']
  ])('올바르게 입력시 예외를 발생시키지 않는다', (input) => {
    expect(() => new Cashier(input)).not.toThrow();
  });
});

describe('Cashier 클래스 메서드 단위테스트', () => {
  test('음식 이름과 수량을 잘 짝지어서 보여주는지 테스트', () => {
    const orderMenu = '티본스테이크-2,샴페인-3,초코케이크-4,시저샐러드-5,바비큐립-3,타파스-3';
    const result = ['티본스테이크 2개', '샴페인 3개', '초코케이크 4개', '시저샐러드 5개', '바비큐립 3개', '타파스 3개'];
    const cashier = new Cashier(orderMenu);

    expect(cashier.foodsListWithQuantity()).toEqual(result);
  });

  test('주문한 음식들의 총 가격을 잘 계산하는지 테스트', () => {
    const orderMenu = '아이스크림-4,티본스테이크-3,샴페인-2,시저샐러드-1';
    const result = (5000 * 4) + (55000 * 3) + (25000 * 2) + (8000 * 1);
    const cashier = new Cashier(orderMenu);

    expect(cashier.totalFoodsPrice()).toEqual(result);
  });
  
  let typeIndex = 0
  test.each([
    ['appetizer'],
    ['main'],
    ['desert'],
    ['drink']
  ])('해당 주문에 지정한 타입음식의 총수량을 잘 계산하는지 테스트', (input) => {
    const orderMenu = '양송이수프-3,타파스-3,티본스테이크-1,해산물파스타-2,바비큐립-2,초코케이크-3,아이스크림-1,제로콜라-2,샴페인-1';
    const result = [6,5,4,3];
    const cashier = new Cashier(orderMenu);

    expect(cashier.totalTypeQuantity(input)).toEqual(result[typeIndex]);
    typeIndex += 1;
  });

  test('주문 금액이 12만원 이상이면 샴페인 증정 해주는지 테스트', () => {
    const orderMenu = '티본스테이크-2,양송이수프-1,타파스-1';
    const result = '샴페인 1개';
    const cashier = new Cashier(orderMenu);

    expect(cashier.freebieMenu()).toEqual(result);
  });

  test('주문 금액이 12만원 미만이면 없음을 표시하는지 테스트', () => {
    const orderMenu = '티본스테이크-2,양송이수프-1';
    const result = '없음';
    const cashier = new Cashier(orderMenu);

    expect(cashier.freebieMenu()).toEqual(result);
  });
});
