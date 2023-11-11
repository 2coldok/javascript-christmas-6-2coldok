import { priceFilter, arrayFilter } from "../util/FormFilter.js"
import { BENEFIT_MESSEAGE } from "./BenefitStorage.js";

export const OUTPUT_REFINER = Object.freeze({
  positivePrice : (priceNumber) => `${priceFilter(priceNumber)}원`,
  
  negativePrice : (priceNumber) => {
    if (priceNumber === 0) return `${priceNumber}원`;

    return `-${priceFilter(priceNumber)}원`;
  },

  benfit : (benfitArray) => {
    if (benfitArray === BENEFIT_MESSEAGE.non) {
      return [benfitArray];
    }
    const stringBenefitArray = [
      `${BENEFIT_MESSEAGE.christmas}${OUTPUT_REFINER.negativePrice(benfitArray[0])}`,
      `${BENEFIT_MESSEAGE.weekday}${OUTPUT_REFINER.negativePrice(benfitArray[1])}`,
      `${BENEFIT_MESSEAGE.weekend}${OUTPUT_REFINER.negativePrice(benfitArray[2])}`,
      `${BENEFIT_MESSEAGE.special}${OUTPUT_REFINER.negativePrice(benfitArray[3])}`,
      `${BENEFIT_MESSEAGE.freebie}${OUTPUT_REFINER.negativePrice(benfitArray[4])}`
    ];

    return arrayFilter(stringBenefitArray);
  }
});