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
    return this.#cashier.totalFoodsPrice() 
  }

  freebieMenu() {
    if (this.totalOrderAmountBeforeDiscount() > DISCOUNT.freebieStandard) {
      return DISCOUNT.freebieItem;
    }
   
    return BENEFIT_MESSEAGE.non;
  }

  benefitList() { 
    if (this.#cashier.totalFoodsPrice() < DISCOUNT.eventStandardAmount) {
      return BENEFIT_MESSEAGE.non;
    }

    return [
      this.#event.christmasDDayDiscount(),
      this.#event.weekdayDiscount(this.#cashier.totalTypeQuantity(NAME.desert)),
      this.#event.weekendDiscount(this.#cashier.totalTypeQuantity(NAME.main)),
      this.#event.specialDiscount(),
      this.#event.freebieDiscount(this.totalOrderAmountBeforeDiscount())
    ];
  }

  totalBenefitAmount() { 
    if (this.benefitList() === BENEFIT_MESSEAGE.non) {
      return 0;
    }

    return this.benefitList()
      .filter((benefit) => benefit !== BENEFIT_MESSEAGE.non)
      .reduce((acc, cur) => acc + cur, 0);
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
