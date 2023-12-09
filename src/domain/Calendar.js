class Calendar {
  #date;

  constructor(year, month, date) {
    this.#date = new Date(year, month - 1, date); // 월은 0부터 시작이기 때문.
  }

  bringDate() {
    return this.#date.getDate();
  }

  bringMonth() {
    return this.#date.getMonth() + 1; // 월은 0부터 시작 이기 때문.
  }

  bringYear() {
    return this.#date.getFullYear();
  }

  bringWeek() {
    const WEEK = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    
    return WEEK[this.#date.getDay()];
  }
  
  // 해당 달의 마지막 일수를 구해준다(28 or 29 or 30 or 31)
  static getLastDayOfMonth(year, month) {
    const date = new Date(year, month, 0);

    return date.getDate();
  }
}

export default Calendar;
