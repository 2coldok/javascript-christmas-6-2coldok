import CoinGenrator from "./CoinGenerator.js";
import MinimumChanges from "./MinimumChanges.js";

class VendingMachine {
  #coins;
  #items;

  #inputPrice;
  #buyItem;

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
  
  // Map(2) { '콜라' => [ '1500', '20' ], '사이다' => [ '1000', '10' ] }
  setItems(items) {
    const map = new Map();

    items.split(';').forEach((item) => {
      const sliceArray = item.split('');
      const [name, price, amount] = sliceArray.slice(1, sliceArray.length - 1).join('').split(',');
    
      map.set(name, [price, amount]);
    });

    this.#items = map;
  }

  //////////////////////////////////////////////////////////////
  updateAtInputPrice() {


  }

  decreaseItemAmount() {
    const [price, amount] = this.#items.get(this.#buyItem);
    const newAmount = amount - 1;
    this.#items.set(this.#buyItem, [price, newAmount]);
  }

  /////////////////////// true 반환시 : 잔돈줘야되는 타이밍, false 반환시 : 잔돈 타이밍 아님 ㅇㅇ
  inputPrice(price) {
    this.#inputPrice = price;
    if (this.isInsufficientPriceInAllItems() || this.isAllItemAmountZero()) {
      return true;
    }
    return false; 
  }

  buyItem(name) {
    this.#buyItem = name;
    if (this.isInsufficientPrice() || this.isItemAmountZero()) {
      return true;
    }
    this.decreaseItemAmount();
    return false;
  }
/////////////////////////////////////////////
  isInsufficientPriceInAllItems() {
    return Array.from(this.#items).every((element) => {
      const [name, [price, amount]] = element;
      return this.#inputPrice < price;
    })
  }

  isInsufficientPrice() {
    const [price, amount] = this.#items.get(this.#buyItem);
    if (this.#inputPrice < price) {
      return true;
    }
    return false;
  }

  isItemAmountZero() {
    const [price, amount] = this.#items.get(this.#buyItem);
    if (amount === 0) {
      return true;
    }
    return false;
  }

  isAllItemAmountZero() {
    return Array.from(this.#items).every((element) => {
      const [name, [price, amount]] = element;
      return amount === 0;
    });
  }
  ////////////////////////////////////////////////////////////

  getChanges() {
    const minimum = new MinimumChanges(this.#inputPrice);

    return minimum.getData();
  }
}

export default VendingMachine;
/*
const a = new VendingMachine();
a.setVendingMachinPrice(450);
a.showVendingMachineCoins();
a.setItems('[콜라,1500,1];[사이다,1000,1]');

a.inputPrice(2000);
a.buyItem('콜라');

a.inputPrice(900);
const k = a.buyItem('사이다');

console.log(k);*/
/*
a.inputPrice(3000);
a.buyItem('사이다');

a.inputPrice(2000);
a.buyItem('콜라');

a.inputPrice(2000);
a.buyItem('콜라');

a.inputPrice(1000);
const k = a.buyItem('사이다');
console.log(k);
*/






// #items 생김새 : Map(2) { '콜라' => [ '1500', '20' ], '사이다' => [ '1000', '10' ] }

