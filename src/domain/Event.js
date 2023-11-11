import { dateValidator } from "../util/Validator.js";
class Event {
  #days;

  #date;
  
  //number
  constructor(days) {
    dateValidator(days);    
    this.#days = days;
    this.#date = new Date(2023, 11, days);
  }
  // 크리스마스 디데이 기간 (1~25일)
  christmasPeriod() {
    if (this.#days <= 25) {
      return true;
    }
    return false
  }
  
  // 주말 (금, 토)
  weekend() {
    if (this.#getWeek() === 'FR' || this.#getWeek() === 'SA') {
      return true;
    }
    return false
  }
  
  // 일요일, 크리스마스(25)
  specialPeriod() {
    if (this.#getWeek() === 'SU' || this.#days === 25) {
      return true;
    }
    return false
  }

  #getWeek() {
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return days[this.#date.getDay()];
  }

  reservationDate() {
    return this.#days;
  }
}

export default Event;
