import CoinGenrator from "./CoinGenerator.js";
// 배열 거꾸로 어떻게
// 특정 문자 제거
class VendingMachine {
  #coins;

  #items;

  setVendingMachinPrice(price) {
    const coinGenerator = new CoinGenrator(price);
    this.#coins = coinGenerator.getCoins();
  }
  
  // [ [ 500, 1 ], [ 100, 0 ], [ 50, 1 ], [ 10, 5 ] ]
  showVendingMachineCoins() {
    const coinTemplete = [500, 100, 50, 10];
    return coinTemplete.map((coin) => {
      return [coin, this.#coins[coin]];
    });
  }

  setItems(items) {
    const map = new Map();

    items.split(';').forEach((item) => {
      const sliceArray = item.split('');
      const [name, price, amount] = sliceArray.slice(1, sliceArray.length - 1).join('').split(',');
    
      map.set(name, [price, amount]);
    });

    this.#items = map;
  }

  
}

export default VendingMachine;

const a = new VendingMachine();

a.setItems('[콜라,1500,20];[사이다,1000,10]');
// #items 생김새 : Map(2) { '콜라' => [ '1500', '20' ], '사이다' => [ '1000', '10' ] }

