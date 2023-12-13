import { Random } from "@woowacourse/mission-utils";
import { COIN } from "../constants/Constants.js";

class CoinGenerator {
  #coinMap;

  #coinIndex = Array.from({ length : 4 }, (_, index) => index);
  #inputMoney; 

  constructor(inputMoney) {
    this.#inputMoney = inputMoney;
    this.#setCoinMap();
    this.#setCoins();
  }

  #setCoinMap() {
    this.#coinMap = new Map()
    .set(500, 0)
    .set(100, 0)
    .set(50, 0)
    .set(10, 0);
  }

  #setCoins() {
    if (this.#inputMoney === 0) return;

    const coin = this.#getRandomCoin();
    const count = this.#coinMap.get(coin) + 1;
    this.#coinMap.set(coin, count);
    this.#inputMoney -= coin;

    return this.#setCoins();
  }

  #getRandomCoin() {
    const coin =  COIN[Random.pickNumberInList(this.#coinIndex)];
    
    if (this.#inputMoney < coin) return this.#getRandomCoin();
    
    return coin;
  }
  
  
  getRandomCoinsMap() {
    return this.#coinMap;
  }
}

export default CoinGenerator;
