import Coin from "./Coin.js";
import CoinGenerator from "./CoinGenerator.js";

// 보유 코인으로 최소의 거슬러줌 기능
// 잔돈이 부족하지 않을 경우, 초과해서 주지 않을 정도 만 거슬러 줌
class Changes {
  #coins;
  #differenceMoney;
  
  constructor(randomCoinMap, differenceMoney) {
    this.#differenceMoney = differenceMoney;
    this.#setCoins(randomCoinMap);
  }

  #setCoins(randomCoinMap) {
    this.#coins = [];

    Array.from(randomCoinMap).filter(([coin, amount]) => amount !== 0)
      .forEach(([coin, amount]) => this.#coins.push(new Coin(coin, amount)));
  }

  getChanges() {
    const check = this.#coins.filter((coin) => coin.getCoin() > this.#differenceMoney);
    if (check.length === this.#coins.length) {
      console.log('모든 코인의 금액이 잔돈보다 큼 ㅇㅇ 이럴떈 그냥 안거슬러줌');
      return 0;
    }

    this.#coins.forEach((coin) => {
      this.#differenceMoney = coin.calculate(this.#differenceMoney);
    });

    console.log(this.#differenceMoney);
    this.#coins.forEach((coin) => {
      console.log(coin.getCoin(), coin.getCount());
    })
  }
}

export default Changes;

const coinGenerator = new CoinGenerator(800);
const randomCoinMap = coinGenerator.getRandomCoinsMap();
console.log(randomCoinMap);

const changes = new Changes(randomCoinMap, 300);
changes.getChanges();