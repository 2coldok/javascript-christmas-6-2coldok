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
    if (this.#date <= DISCOUNT.christmasDate) {
      return DISCOUNT.christmasBasic + (this.#date - 1) * DISCOUNT.christmasAccumulation;
    }
    return DISCOUNT.zero;
  }

  weekdayDiscount(desertQuantity) {
    if (
      this.#week() !== 'FR' &&
      this.#week() !== 'SA' &&
      desertQuantity !== 0
    ) return desertQuantity * DISCOUNT.weekday;
    
    return DISCOUNT.zero;
  }

  weekendDiscount(mainQuantity) {
    if (mainQuantity === 0) return 0;
    
    if (this.#week() === 'FR' || this.#week() === 'SA') {
      return mainQuantity * DISCOUNT.weekend;
    }
    return DISCOUNT.zero;
  }

  specialDiscount() {
    if (this.#week() === 'SU' || this.#date === DISCOUNT.christmasDate) {
      return DISCOUNT.special;
    }
    return DISCOUNT.zero;
  }

  freebieDiscount(totalFoodsPriceBeforeDiscount) {
    if (totalFoodsPriceBeforeDiscount >= DISCOUNT.freebieStandard) {
      return DISCOUNT.freebiePrice;
    }
    return DISCOUNT.zero;
  }

  condition(totalFoodsPriceBeforeDiscount) {
    if (totalFoodsPriceBeforeDiscount >= DISCOUNT.eventStandardAmount) {
      return true;
    }
    return false
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
