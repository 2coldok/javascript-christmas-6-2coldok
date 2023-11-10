import Event from "./Event.js";
import { DISCOUNT, BADGE, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";

// undefined 처리 생각하기
class EventCounter {
  #event;

  #days;
  
  constructor(daysString) {
    this.#event = new Event(Number(daysString));
    this.#days = Number(daysString);
  }

  christmasDDayDiscount() {
    if (this.#event.christmasPeriod()) {
      return DISCOUNT.christmasBasic + (this.#days - 1) * DISCOUNT.christmasAccumulation;
    }
  }

  weekdayDiscount(desertQuantity) {
    if (!this.#event.weekend()) {
      return desertQuantity * DISCOUNT.weekday;
    }
  }

  weekendDiscount(mainQuantity) {
    if (this.#event.weekend()) {
      return mainQuantity * DISCOUNT.weekend;
    }
  }

  specialDiscount() {
    if (this.#event.specialPeriod()) {
      return DISCOUNT.special;
    }
  }

  freebieDiscount(totalFoodsPriceBeforeDiscount) {
    if (totalFoodsPriceBeforeDiscount >= DISCOUNT.freebieStandard) {
      return DISCOUNT.freebieAmount;
    }
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

  getBadge(totalBenefitAmount) {  // 15라인 생각하기
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

export default EventCounter;
/*
const a = new EventCounter('3');
console.log(a.christmasDDayDiscount());
console.log(a.weekdayDiscount(2));
console.log(a.weekendDiscount(3));
console.log(a.specialDiscount());
console.log(a.freebieDiscount(200000));*/

/*
const k = new EventCounter(25);
console.log(k.checkFreebieSatisfied(100000));
console.log(k.checkBadgeSatisfied(5000));
console.log(k.getBadge(11222));*/