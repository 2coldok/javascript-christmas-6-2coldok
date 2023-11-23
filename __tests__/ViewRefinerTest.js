import {
  priceFilter,
  PRICE_REFINER,
  merageFoodInfo,
  BENEFITS_REFINER,
  isNotApplicableBenefits
} from "../src/constants/ViewRefiner.js";

test('숫자를 천단위로 잘라서 문자로 변환되는지 테스트', () => {
  const NUMBER = 1234567890;
  const PRICE_STRING = '1,234,567,890';
  
  expect(priceFilter(NUMBER)).toEqual(PRICE_STRING);
});

test('숫자가 0일경우 문자로 0원을 반환한다', () => {
  const PRICE = 0;
  const RESULT = '0원';

  expect(PRICE_REFINER.negative(PRICE)).toEqual(RESULT);
});

test('숫자가 0이 아니라면 천단위로 잘라 마이너스와 원을 붙여 문자로 반환한다', () => {
  const PRICE = 1500000;
  const RESULT = '-1,500,000원';

  expect(PRICE_REFINER.negative(PRICE)).toEqual(RESULT);
});

test('음식 이름과 수량을 잘 짝지어 주는지 테스트', () => {
  const FOOD_NAME = '시골된장찌개';
  const FOOD_AMOUNT = '7';
  const FOOD_NAME_WITH_AMOUNT = '시골된장찌개 7개';

  expect(merageFoodInfo(FOOD_NAME, FOOD_AMOUNT)).toEqual(FOOD_NAME_WITH_AMOUNT);
});

test('혜택 내역이 하나도 없을때(키 condition의 value가 false) 없음이라는 문자만 담긴 배열을 반환한다', () => {
  const map = new Map();
  map
    .set('christmas', 1000)
    .set('weekday', 2023 * 1)
    .set('weekend', 0)
    .set('special', 0)
    .set('freebie', 0)
    .set('condition', false);

  const BENEFITS_LIST = ['없음'];

  expect(BENEFITS_REFINER.benfitList(map)).toEqual(BENEFITS_LIST);
});

test('키 condition의 value가 true라면 map에 담긴 정보를 최종 출력형식에 맞춰 문자 배열로 반환한다', () => {
  const map = new Map();
  map
    .set('christmas', 1000 + (24 -1) * 100)
    .set('weekday', 2023 * 10)
    .set('weekend', 0)
    .set('special', 1000)
    .set('freebie', 25000)
    .set('condition', true);

  const BENEFITS_ARRAY = [
    '크리스마스 디데이 할인: -3,300원',
    '평일 할인: -20,230원',
    '특별 할인: -1,000원',
    '증정 이벤트: -25,000원'
  ];

  expect(BENEFITS_REFINER.benfitList(map)).toEqual(BENEFITS_ARRAY);
});

test('모든 혜택 할인금액이 0원이면 true를 반환한다', () => {
  const map = new Map();
  map
    .set('christmas', 0)
    .set('weekday', 0)
    .set('weekend', 0)
    .set('special', 0)
    .set('freebie', 0)
    .set('condition', true);

  expect(isNotApplicableBenefits(map)).toEqual(true);
});

test('map 속의 conditon 의 value 가 false라면 true를 반환한다', () => {
  const map = new Map();
  map
    .set('christmas', 2000)
    .set('weekday', 2023)
    .set('weekend', 0)
    .set('special', 1000)
    .set('freebie', 25000)
    .set('condition', false);
  
  expect(isNotApplicableBenefits(map)).toEqual(true);
});

test('혜택 금액이 모두 0원이 아니면서 conditon의 value가 true라면 false를 반환한다', () => {
  const map = new Map();
  map
    .set('christmas', 0)
    .set('weekday', 0)
    .set('weekend', 0)
    .set('special', 0)
    .set('freebie', 25000)
    .set('condition', true);
  
  expect(isNotApplicableBenefits(map)).toEqual(false);
});
