const NUMBER = /^[0-9]*$/;

export const dateValidator = (dateStirng) => {
  if (!NUMBER.test(dateStirng)) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.(날짜는 숫자만 가능)');
  }

  if (Number(dateStirng) < 1 || Number(dateStirng) > 31) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.(1 ~ 31 사이의 숫자만)');
  }
};

// 타파스-2
export const orderFormValidator = (order) => {
  if (!order.includes('-')) {
    throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(- 가 없습니다. 형식오류)');
  }

  if (order.split('-').length !== 2) {
    throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(- 가 두개 이상임)');
  }

  const [name, amount] = order.split('-');
  if (!NUMBER.test(amount)) {
    throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(음식 수량은 숫자만 가능함)');
  }
};