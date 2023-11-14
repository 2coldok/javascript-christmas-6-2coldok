import Event from "./Event.js";
import Cashier from "./Cashier.js";
import { DISCOUNT, EVENT_NAME } from "../constants/BenefitStorage.js";
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
      .set(EVENT_NAME.christmas, this.#event.christmasDDayDiscount())
      .set(EVENT_NAME.weekday, this.#event.weekdayDiscount(this.#cashier.totalTypeQuantity(NAME.desert)))
      .set(EVENT_NAME.weekend, this.#event.weekendDiscount(this.#cashier.totalTypeQuantity(NAME.main)))
      .set(EVENT_NAME.special, this.#event.specialDiscount())
      .set(EVENT_NAME.freebie, this.#event.freebieDiscount(this.#cashier.totalFoodsPrice()))
      .set(EVENT_NAME.condition, this.#event.condition(this.#cashier.totalFoodsPrice()));
  }

  totalBenefitAmount() {
    if (this.benefitList().get(EVENT_NAME.condition)) {
      return this.benefitList().get(EVENT_NAME.christmas)
        + this.benefitList().get(EVENT_NAME.weekday) 
        + this.benefitList().get(EVENT_NAME.weekend) 
        + this.benefitList().get(EVENT_NAME.special) 
        + this.benefitList().get(EVENT_NAME.freebie);
    }
    return DISCOUNT.zero;
  }

  #totalDiscountAmount() {
    if (this.benefitList().get(EVENT_NAME.condition)) {
      return this.benefitList().get(EVENT_NAME.christmas)
      + this.benefitList().get(EVENT_NAME.weekday)
      + this.benefitList().get(EVENT_NAME.weekend)
      + this.benefitList().get(EVENT_NAME.special);
    }
    return DISCOUNT.zero;
  }

  finalPaymentAmount() {
    return this.#cashier.totalFoodsPrice() - this.#totalDiscountAmount();
  }

  giveBadge() { 
    return this.#event.getBadge(this.totalBenefitAmount());
  }
}

export default Supervisor;
