import Event from "./Event.js";
import Cashier from "./Cashier.js";
import { DISCOUNT, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";

class BenefitSupervisor {
  #event;

  #foodCounter;
  
  constructor(daysString, foodsString) {
    this.#event = new Event(daysString)/*new EventCounter(daysString);*/
    this.#foodCounter = new Cashier(foodsString);
  }

  orderMenu() {
    return this.#foodCounter.foodsListWithQuantity(); // ['타파스 1개', '제로콜라 11개', '아이스크림 3개']
  }
  
  totalOrderAmountBeforeDiscount() {
    return this.#foodCounter.totalFoodsPrice() // 8500 (음식들 총 가격) [price 처리하기]
  }

  freebieMenu() { //없음 처리 햇음
    if (
      this.#event
      .checkFreebieSatisfied(this.totalOrderAmountBeforeDiscount())  //12만원 안되면 undefinded , 되면 샴페인 1개
    ) {
      return DISCOUNT.freebieItem;
    } else { // else 지양 생각  
      return BENEFIT_MESSEAGE.non;
    } 
  }

  benefitList() { // [ViewRefiner에서 처리하기] 없음처리 햇나?
    if (this.#foodCounter.totalFoodsPrice() < DISCOUNT.eventStandardAmount) {
      return BENEFIT_MESSEAGE.non;
    }
    return [
      this.#event.christmasDDayDiscount(),
      this.#event.weekdayDiscount(this.#foodCounter.totalTypeQuantity('desert')),
      this.#event.weekendDiscount(this.#foodCounter.totalTypeQuantity('main')),
      this.#event.specialDiscount(),
      this.#event.freebieDiscount(this.totalOrderAmountBeforeDiscount())
    ];
  }

  totalBenefitAmount() { //[price 처리하기] / 0원처리 되나 확인좀하자
    if (this.benefitList() === BENEFIT_MESSEAGE.non) {
      return 0;
    }

    const discountPriceArray = this.benefitList().filter((discount) => {
      return discount !== BENEFIT_MESSEAGE.non;
    });

    return discountPriceArray.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  }

  finalPaymentAmount() {
    if (this.#foodCounter.totalFoodsPrice() >= DISCOUNT.freebieStandard) {
      return this.totalOrderAmountBeforeDiscount() - this.totalBenefitAmount() + DISCOUNT.freebieAmount; 
    }
    return this.totalOrderAmountBeforeDiscount() - this.totalBenefitAmount();
  }

  giveBadge() { // 없음 처리 완료
    return this.#event.getBadge(this.totalBenefitAmount());
  }
}

export default BenefitSupervisor;
