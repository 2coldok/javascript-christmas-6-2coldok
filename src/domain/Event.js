import { dateValidator } from "../util/Validator.js";
class Event {
  #date;

  //number
  constructor(date) {
    dateValidator(date);    
    this.#date = date;
  }

  #week() {
    const WEEK = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    
    return WEEK[new Date(2023, 11, this.#date).getDay()];
  }

  // 크리스마스 디데이 기간 (1~25일)
  christmasPeriod() {
    if (this.#date <= 25) {
      return true;
    }
    return false
  }
  
  // 주말 (금, 토)
  weekend() {
    if (this.#week() === 'FR' || this.#week() === 'SA') {
      return true;
    }
    return false
  }
  
  // 일요일, 크리스마스(25)
  specialPeriod() {
    if (this.#week() === 'SU' || this.#date === 25) {
      return true;
    }
    return false
  }

  reservationDate() {
    return this.#date;
  }
}

export default Event;
