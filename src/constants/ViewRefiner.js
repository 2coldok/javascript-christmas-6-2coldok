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

export const isNotApplicableBenefits = (benefitList) => {
  const benefitsResultArray = [];
  for (let benefitResult of benefitList.values()) {
    if (benefitResult !== 0) benefitsResultArray.push(benefitResult);
  }
  if (benefitsResultArray.length === 1) return true;
  if (!benefitList.get(EVENT_NAME.condition)) return true;

  return false;
}

export const BENEFITS_REFINER = Object.freeze({
  benfitList : (benefitList) => {
    if (isNotApplicableBenefits(benefitList)) return [BENEFIT_MESSEAGE.non];
    
    const refinedBenefits = [];
    benefitList.forEach((value, key) => {
      if (value !==0 && typeof(value) !== 'boolean') {
        refinedBenefits.push(`${BENEFIT_MESSEAGE[key]}${PRICE_REFINER.negative(value)}`);   
      }
    });
    return refinedBenefits;
  },
});
