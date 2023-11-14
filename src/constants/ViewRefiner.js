import { BENEFIT_MESSEAGE } from "./BenefitStorage.js";
import { EVENT_NAME } from "./BenefitStorage.js";

export const priceFilter = (priceNumber) => {
  return new Intl.NumberFormat('ko-KR').format(priceNumber);
};

export const merageFoodInfo = (foodName, foodAmount) => {
  return `${foodName} ${foodAmount}개`;
};

export const PRICE_REFINER = Object.freeze({
  positive : (priceNumber) => `${priceFilter(priceNumber)}원`,
  negative : (priceNumber) => {
    if (priceNumber === 0) return `${priceNumber}원`;

    return `-${priceFilter(priceNumber)}원`;
  },
});

export const BENEFITS_REFINER = Object.freeze({
  benfitList : (benefitList) => {
    if (!benefitList.get(EVENT_NAME.condition)) return [BENEFIT_MESSEAGE.non];

    const refinedBenefits = [];
    const copyBenefitList = benefitList;
    copyBenefitList.delete(EVENT_NAME.condition);
    copyBenefitList.forEach((value, key) => {
      if (value !== 0) {
        refinedBenefits.push(`${BENEFIT_MESSEAGE[key]}${PRICE_REFINER.negative(value)}`);
      }
    });
    return refinedBenefits;
  },
});
