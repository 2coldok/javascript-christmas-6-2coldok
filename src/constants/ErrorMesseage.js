export const ERROR_DATE = Object.freeze({
  basic : '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  minDate : 1,
  maxDate : 31,
});

export const ERROR_MENU = Object.freeze({
  basic : '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  onlyDrink : '[ERROR] 음료만 주문 시, 주문할 수 없습니다.',
  maxOrder : '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.',
  orderAmountExample : '(e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)',
  minOrderNumber : 1,
  maxOrderNumber : 20,
});
