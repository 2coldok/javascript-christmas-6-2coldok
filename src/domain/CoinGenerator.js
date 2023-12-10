import { Random } from "@woowacourse/mission-utils";

const COIN = [500, 100, 50, 10];

class CoinGenrator {
  #price;
  #coins;
  
  constructor(inputPrice) {
    this.#price = inputPrice;
    this.#setCoins(); 
    this.#startGenerate();
  }

  #setCoins() {
    const map = new Map();
    map.set(500, 0);
    map.set(100, 0);
    map.set(50, 0);
    map.set(10, 0);

    this.#coins = map;
  }

  #startGenerate() {
    const coin = Random.pickNumberInList(COIN);
    if (this.#price === 0) return;

    if (this.#price >= coin) {
      this.#price -= coin;
      const count = this.#coins.get(coin) + 1;
      this.#coins.set(coin, count);

      return this.#startGenerate();
    } else {
      return this.#startGenerate();
    }
  }

  getCoins() {
    return Object.fromEntries(this.#coins);
  }
}

export default CoinGenrator;
/*
const a = new CoinGenrator(1000);

console.log(a.getCoins());
{ '10': 0, '50': 6, '100': 2, '500': 1 }*/