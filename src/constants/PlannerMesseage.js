export const QUESTION = Object.freeze({
  date : '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
  menu : '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
});

export const ANSWER = Object.freeze({
  introduce : '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  prolog : (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderMenu : '<주문 메뉴>',
  totalOrderAmount : '<할인 전 총주문 금액>',
  freebieMenu : '<증정 메뉴>',
  benefitList : '<혜택 내역>',
  totalBenefitAmount : '<총혜택 금액>',
  finalPaymentAmount : '<할인 후 예상 결제 금액>',
  DecemberEventBadge : '<12월 이벤트 배지>',
});
 