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
  // 투입금액이 모든 상품 금액보다 적은가?
  // 투입 금액시 검증
  isLowerMoneyForAllPrice() {
    const count = this.#items.filter((item) => item.getPrice() > this.#inputMoney);

    if (count.length === this.#items.length) {
      return true;
    } else {
      return false;
    }
  }

  //모든 상품 수량이 0인가?
  //구매 상품명 입력시 검증
  isAllItemsOring() {
    const count = this.#items.filter((item) => item.getAmount() === 0);

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
/*console.log(vendingMachine.isLowerMoneyForAllPrice());*/
/*console.log(vendingMachine.isAllItemsOring());*/
