import EventCounter from "./EventCounter.js";
import FoodCounter from "./FoodCounter.js";
import { DISCOUNT, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";


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
    return this.#foodCounter.totalFoodsPrice() // 8500 (음식들 총 가격)
  }

  freebieMenu() {
    if (
      this.#eventCounter
      .checkFreebieSatisfied(this.totalOrderAmountBeforeDiscount())  //12만원 안되면 undefinded , 되면 샴페인 1개
    ) {
      return DISCOUNT.freebieItem;
    } else {
      return BENEFIT_MESSEAGE.non;
    } 
  }

  benefitList() {
    const benefitList = [
      `${BENEFIT_MESSEAGE.christmas}${this.#eventCounter.christmasDDayDiscount()}원`,
      `${BENEFIT_MESSEAGE.weekday}${this.#eventCounter.weekdayDiscount(this.#foodCounter.totalTypeQuantity('desert'))}원`,
      `${BENEFIT_MESSEAGE.weekend}${this.#eventCounter.weekendDiscount(this.#foodCounter.totalTypeQuantity('main'))}원`,
      `${BENEFIT_MESSEAGE.special}${this.#eventCounter.specialDiscount()}원`,
      `${BENEFIT_MESSEAGE.freebie}${this.#eventCounter.freebieDiscount(this.totalOrderAmountBeforeDiscount())}원`
    ];

    return benefitList;
  }

  totalBenefitAmount() {
    
  }



}

export default BenefitSupervisor;

const a = new BenefitSupervisor('22','바비큐립-3,초코케이크-2,제로콜라-2,아이스크림-1');
console.log(a.freebieMenu());