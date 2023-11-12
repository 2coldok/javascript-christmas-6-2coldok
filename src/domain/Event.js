import { dateValidator } from "../util/Validator.js";
import { DISCOUNT, BADGE, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";

class Event {
  #date;

  constructor(date) {
    dateValidator(Number(date));    
    this.#date = Number(date);
  }

  #week() {
    const WEEK = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    
    return WEEK[new Date(2023, 11, this.#date).getDay()];
  }

  date() {
    return this.#date;
  }

  christmasDDayDiscount() {
    if (this.#date <= 25) {
      return DISCOUNT.christmasBasic + (this.#date - 1) * DISCOUNT.christmasAccumulation;
    }
    return BENEFIT_MESSEAGE.non;
  }

  weekdayDiscount(desertQuantity) {
    if (desertQuantity === 0) {
      return BENEFIT_MESSEAGE.non;
    }
    if (this.#week() !== 'FR' && this.#week() !== 'SA') {
      return desertQuantity * DISCOUNT.weekday;
    }
    return BENEFIT_MESSEAGE.non;
  }

  weekendDiscount(mainQuantity) {
    if (mainQuantity === 0) {
      return BENEFIT_MESSEAGE.non;
    }
    if (this.#week() === 'FR' || this.#week() === 'SA') {
      return mainQuantity * DISCOUNT.weekend;
    }
    return BENEFIT_MESSEAGE.non;
  }

  specialDiscount() {
    if (this.#week() === 'SU' || this.date === 25) {
      return DISCOUNT.special;
    }
    return BENEFIT_MESSEAGE.non;
  }

  freebieDiscount(totalFoodsPriceBeforeDiscount) {
    if (totalFoodsPriceBeforeDiscount >= DISCOUNT.freebieStandard) {
      return DISCOUNT.freebiePrice;
    }
    return BENEFIT_MESSEAGE.non;
  }

  checkFreebieSatisfied(totalFoodsPriceBeforeDiscount) {
    if (totalFoodsPriceBeforeDiscount >= DISCOUNT.freebieStandard) {
      return true;
    }
  }

  checkBadgeSatisfied(totalBenefitAmount) {
    if (totalBenefitAmount >= BADGE.star) {
      return true;
    }
  }

  getBadge(totalBenefitAmount) { 
    if (totalBenefitAmount < BADGE.star) {
      return BENEFIT_MESSEAGE.non;
    }
    if (totalBenefitAmount >= BADGE.santa) {
      return BADGE.santaName;
    }
    if (totalBenefitAmount >= BADGE.tree) {
      return BADGE.treeName;
    }
    if (totalBenefitAmount >= BADGE.star) {
      return BADGE.starName;
    }
  }
}

export default Event;
