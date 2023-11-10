import EventCounter from "./EventCounter.js";
import FoodCounter from "./FoodCounter.js";
import { DISCOUNT, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";

import { OUTPUT_REFINER } from "../constants/ViewRefiner.js";


class BenefitSupervisor {
  #eventCounter;

  #foodCounter;
  
  constructor(daysString, foodsString) {
    this.#eventCounter = new EventCounter(daysString);
    this.#foodCounter = new FoodCounter(foodsString);
  }

  OrderMenu() {
    return this.#foodCounter.foodsListWithQuantity(); // ['타파스 1개', '제로콜라 11개', '아이스크림 3개']
  }
  
  totalOrderAmountBeforeDiscount() {
    return this.#foodCounter.totalFoodsPrice() // 8500 (음식들 총 가격) [price 처리하기]
  }

  freebieMenu() { //없음 처리 햇음
    if (
      this.#eventCounter
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
    const benefitList = [
      this.#eventCounter.christmasDDayDiscount(),
      this.#eventCounter.weekdayDiscount(this.#foodCounter.totalTypeQuantity('desert')),
      this.#eventCounter.weekendDiscount(this.#foodCounter.totalTypeQuantity('main')),
      this.#eventCounter.specialDiscount(),
      this.#eventCounter.freebieDiscount(this.totalOrderAmountBeforeDiscount())
    ];

    return benefitList;
  }

  totalBenefitAmount() { //[price 처리하기] / 0원처리 되나 확인좀하자
    if (this.benefitList() === BENEFIT_MESSEAGE.non) {
      return 0;
    }

    const discountPriceArray = this.benefitList().filter((discount) => {
      return discount !== undefined;
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
    return this.#eventCounter.getBadge(this.totalBenefitAmount());
  }



}

export default BenefitSupervisor;

const a = new BenefitSupervisor('3','티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1');

console.log(a.OrderMenu());
console.log(OUTPUT_REFINER.positivePrice(a.totalOrderAmountBeforeDiscount()));
console.log(a.freebieMenu());
console.log(OUTPUT_REFINER.benfit(a.benefitList()));
console.log(OUTPUT_REFINER.negativePrice(a.totalBenefitAmount()));
console.log(OUTPUT_REFINER.positivePrice(a.finalPaymentAmount()));
console.log(a.giveBadge());
/*
console.log(OUTPUT_REFINER.benfit(a.benefitList()));*/