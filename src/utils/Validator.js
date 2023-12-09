
const NUMBER = /^[0-9]*$/;

export const dateValidator = (date) => {
  if (!NUMBER.test(date)) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }
  
  if (date.includes(' ') || date.includes('.')) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }

  if (date < 1 || date > 31) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }
};
