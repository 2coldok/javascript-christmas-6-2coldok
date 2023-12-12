import Items from "./Items.js";

class VendingMachine {
  #inputMoney;
  #items;
  
  constructor() {

  }

  setInputMoney(inputMoney) {
    this.#inputMoney = Number(inputMoney);
  }

  setItems(items) {
    this.#items = [];
    items.split(';').forEach((element) => this.#items.push(new Items(element)));
  }
  // 
  isLowerMoneyForAllPrice() {
    const count = this.#items.filter((item) => item.getPrice() > this.#inputMoney);

    if (count.length === this.#items.length) {
      return true;
    } else {
      return false;
    }
  }

  

  
}

export default VendingMachine;

const vendingMachine = new VendingMachine();
vendingMachine.setInputMoney('999');
vendingMachine.setItems('[콜라,1500,20];[사이다,1000,10]');
console.log(vendingMachine.isLowerMoneyForAllPrice());

