import Calendar from "./Calendar.js";

/**** 총주문 금액 1만원 이상부터 이벤트 적용 생각 */
class Event {
  #calendar;
  #date;
  //number
  constructor(date) {
    this.#date = date;
    this.#calendar = new Calendar(2023, 12, date);
  }
  // 총주문 금액에서 이만큼 할인
  chirstmasDDayDiscount() {
    if (this.#calendar.bringDate() >=1 || this.#calendar.bringDate() <= 25) {
      return 1000 + (this.#date - 1) * 100;
    } else {
      return 0;
    }
  }

  weekdayDiscount(desertAmount) {
    if (this.#calendar.bringWeek() !== 'FR' && this.#calendar.bringWeek() !== 'SA') {
      return desertAmount * 2023;
    } else {
      return 0;
    }
  }

  weekendDiscount(mainAmount) {
    if (this.#calendar.bringWeek() === 'FR' || this.#calendar.bringWeek() === 'SA') {
      return mainAmount * 2023;
    } else {
      return 0;
    }
  }
  // 총 주문 금액에서 할인
  specialDiscount() {
    if (this.#calendar.bringDate() === 25 || this.#calendar.bringWeek() === 'SU') {
      return 1000;
    } else {
      return 0;
    }
  }

  freebieDiscount(totalOrderPrice) {
    if (totalOrderPrice >= 120000) {
      return 25000;
    } else {
      return 0;
    }
  }
}

export default Event;

/*
const a = new Event(3);
console.log(a.chirstmasDDayDiscount());
console.log(a.weekdayDiscount(2));
console.log(a.weekendDiscount(2));
console.log(a.specialDiscount());
console.log(a.freebieDiscount(142000));
*/