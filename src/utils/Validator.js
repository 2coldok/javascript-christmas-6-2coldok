export const lengthValidator = (lengthString) => {
  const length = Number(lengthString);
  
  if (
    Number.isNaN(length) ||
    length > 20 ||
    length < 3
  ) {
    throw new Error('[ERROR] 다리 길이 오류');
  }
};