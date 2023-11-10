import { BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js"

export const stringFilter = (string) => {
  if (string === undefined) {
    return BENEFIT_MESSEAGE.non;
  }

  if (string !== undefined) {
    return string;
  }
}

export const arrayFilter = (array) => {
  const filtedArray = array.filter((element) => {
    return !element.includes(undefined) && !element.includes(NaN);
  });

  if (filtedArray.length === 0) {
    return BENEFIT_MESSEAGE.non;
  }

  if (filtedArray.length !== 0) {
    return filtedArray;
  }
}

export const priceFilter = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
}
