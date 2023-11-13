import Food from "../src/domain/Food.js";

describe('Food 클래스 메서드 단위테스트', () => {
  test.each([['양송이수프-1'], ['타파스-2'], ['시저샐러드-3']])('[타입메서드] 해당 메뉴가 에피타이저 타입인걸 잘 찾는지', (input) => {
    const result = 'appetizer';
    const food = new Food(input);

    expect(food.type()).toEqual(result);
  });

  test.each([['티본스테이크-10'], ['바비큐립-11'], ['해산물파스타-12'], ['크리스마스파스타-13']])('[타입메서드] 해당 메뉴가 메인 타입인걸 잘 찾는지', (input) => {
    const result = 'main';
    const food = new Food(input);

    expect(food.type()).toEqual(result);
  });

  test.each([['초코케이크-19'], ['아이스크림-17']])('[타입메서드] 해당 메뉴가 디저트 타입인걸 잘 찾는지', (input) => {
    const result = 'desert';
    const food = new Food(input);

    expect(food.type()).toEqual(result);
  });

  test.each([['제로콜라-1'], ['레드와인-2'], ['샴페인-3']])('[타입메서드] 해당 메뉴가 음료 타입인걸 잘 찾는지', (input) => {
    const result = 'drink';
    const food = new Food(input);

    expect(food.type()).toEqual(result);
  });

  test('음식 이름을 잘 반환하는지', () => {
    const input = '초코케이크-10';
    const result = '초코케이크';
    const food = new Food(input);

    expect(food.name()).toEqual(result);
  });

  test('음식의 수량을 잘 반환하는지', () => {
    const input = '양송이수프-4';
    const result = 4;
    const food = new Food(input);

    expect(food.quantity()).toEqual(result);
  });
  
  let totalPriceIndex = 0;
  test.each([
    ['티본스테이크-20'],
    ['양송이수프-2'],
    ['초코케이크-10'],
    ['시저샐러드-10'],
    ['샴페인-2'],
    ['해산물파스타-5']
  ])('음식의 총가격을 계산 잘 계산해주는지 테스트', (input) => {
    const result = [1100000, 12000, 150000, 80000, 50000, 175000];
    const food = new Food(input);

    expect(food.totalPrice()).toEqual(result[totalPriceIndex]);
    totalPriceIndex += 1;
  });
});

describe('Food 클래스 유효성 검증 단위 테스트', () => {
  test.each([
    ['샴페인-2-1'],
    ['제로콜라-초코케이크-3'],
    ['타파스-아이스크림-레드와인'],
    ['시저샐러드-10-샴페인-1'],
    ['시저샐러드--1']
  ])('음식 정보가 담긴 문자를 - 로 잘라 배열로 만들었을때 배열 길이가 2가 아니면 예외처리', (input) => {
      expect(() => new Food(input)).toThrow('[ERROR]');
  });

  test('메뉴에 없는 음식은 예외처리', () => {
    const input = '탕후루-5';
    
    expect(() => new Food(input)).toThrow('[ERROR]');
  });

  test.each([
    ['샴페인-2#'],
    ['시저샐러드-두개'],
    ['아이스크림-1개'],
    ['타파스-1a']
  ])('수량이 숫자가 아니면 예외처리', (input) => {
    expect(() => new Food(input)).toThrow('[ERROR]');
  });
  
  test('음식의 수량이 0이면 예외 처리', () => {
    const input = '시저샐러드-0';
    
    expect(() => new Food(input)).toThrow('[ERROR]');
  });

  
  
    

});