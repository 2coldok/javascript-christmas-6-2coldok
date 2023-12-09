import Calendar from "./Calendar.js";
import { dateValidator } from "../util/Validator.js";

class Event {
  #calendar;
  
  // 날짜 원본
  constructor(date) {
    dateValidator(date);
    this.#calendar = new Calendar(2023, 12, Number(date));
  }
  
  // true : 만족 , false : 불만족
  eventCondition(totalOrderPrice) {
    if (totalOrderPrice >= 10000) {
      return true;
    }
    return false;
  }

  christmasDDdayDiscount() {
    if (this.#calendar.bringDate() >= 1 && this.#calendar.bringDate() <= 25) {
      return 1000 + (this.#calendar.bringDate() - 1) * 100;
    }
    return 0;
  }
  
  // 평일 : 금, 토 제외
  weekdayDiscount(desertAmount) {
    if (this.#calendar.bringWeek() !== 'FR' && this.#calendar.bringWeek() !== 'SA') {
      return desertAmount * 2023;
    }
    return 0;
  }
  
  // 주말 : 금, 토 
  weekendDiscount(mainAmount) {
    if (this.#calendar.bringWeek() === 'FR' || this.#calendar.bringWeek() === 'SA') {
      return mainAmount * 2023;
    }
    return 0;
  }

  specialDiscount() {
    if (this.#calendar.bringWeek() === 'SU' || this.#calendar.bringDate() === 25) {
      return 1000;
    }
    return 0;
  }

  freebieDiscount(totalOrderPrice) {
    if (totalOrderPrice >= 120000) {
      return 25000;
    }
    return 0;
  }
  
  // 총 혜택 금액 : 할인 금액의 합계 + 증정 메뉴의 가격(25000)
  decemberBadge(totalBenefitPrice) {
    if (totalBenefitPrice >= 20000) {
      return '산타';
    }
    if (totalBenefitPrice >= 10000) {
      return '트리';
    }
    if (totalBenefitPrice >= 5000) {
      return '별';
    }
    return '없음';
  }
}

export default Event;
