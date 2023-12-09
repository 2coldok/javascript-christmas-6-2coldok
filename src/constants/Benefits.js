export const BENEFITS = Object.freeze({
  christmas : '크리스마스 디데이 할인: ',
  weekday : '평일 할인: ',
  weekend : '주말 할인: ',
  special : '특별 할인: ',
  freebie : '증정 이벤트: ',
});

const priceFilter = (price) => new Intl.NumberFormat('ko-KR').format(price);

export const negativePrice = (price) => {
  return `-${priceFilter(price)}원`;
};

export const positivePrice = (price) => {
  return `${priceFilter(price)}원`;
};