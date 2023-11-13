export const ERROR_DATE = Object.freeze({
  basic : '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  minDate : 1,
  maxDate : 31,
});

export const ERROR_MENU = Object.freeze({
  basic : '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  minOrder : 1,
  maxOrder : 20,
});

/*
export const REGEX_ERROR = Object.freeze({
  number : /[^0-9]/g, // test시 숫자 이외에 모든것에 true 반환
  menu : /[^0-9가-힣\-,]/g, // test시 숫자, 컴마, 한글, 하이폰 이외의 모든것에 ture 반환
})*/
