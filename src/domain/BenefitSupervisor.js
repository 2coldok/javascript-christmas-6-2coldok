import Event from "./Event.js";
import Cashier from "./Cashier.js";
import { DISCOUNT, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";

class BenefitSupervisor {
  #event;

  #cashier;
  
  constructor(reservationDate, orderHistory) {
    this.#event = new Event(reservationDate)
    this.#cashier = new Cashier(orderHistory);
  }

  orderMenu() {
    return this.#cashier.foodsListWithQuantity(); // ['타파스 1개', '제로콜라 11개', '아이스크림 3개']
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
      this.#event.weekdayDiscount(this.#cashier.totalTypeQuantity('desert')),
      this.#event.weekendDiscount(this.#cashier.totalTypeQuantity('main')),
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

export default BenefitSupervisor;
