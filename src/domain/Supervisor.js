import Event from "./Event.js";
import Cashier from "./Cashier.js";
import { DISCOUNT } from "../constants/BenefitStorage.js";
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

  event() {
    return this.#event;
  }

  cashier() {
    return this.#cashier;
  }
  
  benefitList() {
    const benefits = new Map();

    return benefits
      .set('christmas', this.#event.christmasDDayDiscount())
      .set('weekday', this.#event.weekdayDiscount(this.#cashier.totalTypeQuantity(NAME.desert)))
      .set('weekend', this.#event.weekendDiscount(this.#cashier.totalTypeQuantity(NAME.main)))
      .set('special', this.#event.specialDiscount())
      .set('freebie', this.#event.freebieDiscount(this.#cashier.totalFoodsPrice()))
      .set('condition', this.#event.condition(this.#cashier.totalFoodsPrice()));
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
      return this.#cashier.totalFoodsPrice() - this.totalBenefitAmount() + DISCOUNT.freebiePrice; 
    }
    return this.#cashier.totalFoodsPrice() - this.totalBenefitAmount();
  }

  giveBadge() { 
    return this.#event.getBadge(this.totalBenefitAmount());
  }
}

export default Supervisor;
