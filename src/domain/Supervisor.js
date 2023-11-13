import Event from "./Event.js";
import Cashier from "./Cashier.js";
import { DISCOUNT, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";
import { NAME } from "../constants/FoodStorage.js";

class Supervisor {
  #event;

  #cashier;

  dateUpload(date) {
    this.#event = new Event(date);
  }

  menuUpload(menu) {
    this.#cashier = new Cashier(menu);
  }
  
  date() {
    return this.#event.date();
  }
  
  orderMenu() {
    return this.#cashier.foodsListWithQuantity();
  }
  
  totalOrderAmountBeforeDiscount() {
    return this.#cashier.totalFoodsPrice(); 
  }
  
  freebieMenu() {
    if (this.totalOrderAmountBeforeDiscount() > DISCOUNT.freebieStandard) {
      return DISCOUNT.freebieItem;
    }
   
    return BENEFIT_MESSEAGE.non;
  }
  
  benefitList() {
    const benefits = new Map();

    benefits.set('christmas', this.#event.christmasDDayDiscount())
      .set('weekday', this.#event.weekdayDiscount(this.#cashier.totalTypeQuantity(NAME.desert)))
      .set('weekend', this.#event.weekendDiscount(this.#cashier.totalTypeQuantity(NAME.main)))
      .set('special', this.#event.specialDiscount())
      .set('freebie', this.#event.freebieDiscount(this.totalOrderAmountBeforeDiscount()))
      .set('condition', this.#event.condition(this.#cashier.totalFoodsPrice()));

    return benefits;
  }

  totalBenefitAmount() {
    if (this.benefitList().get('condition')) {
      return this.benefitList().get('christmas')
        + this.benefitList().get('weekday') 
        + this.benefitList().get('weekend') 
        + this.benefitList().get('special') 
        + this.benefitList().get('freebie');
    }
    return 0;
  }
  
  finalPaymentAmount() {
    if (this.#cashier.totalFoodsPrice() >= DISCOUNT.freebieStandard) {
      return this.totalOrderAmountBeforeDiscount() - this.totalBenefitAmount() + DISCOUNT.freebiePrice; 
    }
    return this.totalOrderAmountBeforeDiscount() - this.totalBenefitAmount();
  }

  giveBadge() { 
    return this.#event.getBadge(this.totalBenefitAmount());
  }
}

export default Supervisor;
