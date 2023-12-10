
// 소수점 제거 방법 Math.floor() : 소수점 버림, 정수 반환

class MinimumChanges {
  #COIN = [500, 100, 50, 10];
  #inputPrice;

  #data;

  constructor(inputPrice) {
    this.#inputPrice = inputPrice;
    this.#data = new Map();
    this.startCalculate();
  }

  startCalculate() {
    this.#COIN.forEach((coin) => this.updateData(coin));
  }

  updateData(coinPrice) {
    if (this.#inputPrice < coinPrice) return 0;

    const count = Math.floor(this.#inputPrice / coinPrice);
    const reminder = this.#inputPrice % coinPrice;
    
    this.#inputPrice = reminder;

    this.#data.set(coinPrice, count);
  }
  
  // [ [ 500, 1 ], [ 100, 1 ] ]

  getData() {
    return Array.from(this.#data);
  }
}

export default MinimumChanges;
/*
const a = new MinimumChanges(600);
const k = a.getData();

console.log(k);
*/