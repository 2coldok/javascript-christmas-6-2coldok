// 잔돈이 부족하지 않을 경우, 초과해서 주지 않을 정도 만 거슬러 줌 
class Coin {
  #coin;
  #amount;

  #count;

  constructor(coin, amount) {
    this.#coin = coin;
    this.#amount = amount;
  }
  
  // 차액 -> 새로운 차액
  calculate(differenceMoney) {
    if (this.#coin <= differenceMoney) {
      const quotient = Math.floor(differenceMoney / this.#coin);
      const remainder = differenceMoney - this.#coin * quotient;
      this.#count = quotient;
      
      return remainder;
    } else {
      return differenceMoney;
    }
  }
  
  // 사용된 동전 개수
  getCount() {
    return this.#count;
  }

  getTotalMoney() {
    return this.#coin * this.#amount;
  }

  getAmount() {
    return this.#amount;
  }

  getCoin() {
    return this.#coin;
  }
}

export default Coin;