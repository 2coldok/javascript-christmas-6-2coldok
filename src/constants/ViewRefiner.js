import { BENEFIT_MESSEAGE } from "./BenefitStorage.js";

export const priceFilter = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
}

export const merageFoodInfo = (foodName, foodAmount) => {
  return `${foodName} ${foodAmount}개`
}

export const PRICE_REFINER = Object.freeze({
  positive : (priceNumber) => `${priceFilter(priceNumber)}원`,
  negative : (priceNumber) => {
    if (priceNumber === 0) return `${priceNumber}원`;

    return `-${priceFilter(priceNumber)}원`;
  },
})

export const BENEFITS_REFINER = Object.freeze({
  benfitList : (benefitList) => {
    if (!benefitList.get('condition')) return [BENEFIT_MESSEAGE.non];

    const array = [];
    const temp = benefitList;
    temp.delete('condition');
    
    temp.forEach((value, key) => {
      if (value !== 0) {
        array.push(`${BENEFIT_MESSEAGE[key]}${PRICE_REFINER.negative(value)}`);
      }
    })
    return array;
  },
})
