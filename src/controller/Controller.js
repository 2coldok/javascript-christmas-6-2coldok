import Coin from "../domain/Coin.js";
import CoinGenerator from "../domain/CoinGenerator.js";
import VendingMachine from "../domain/VendingMachine.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  #vendingMachine;
  #vendingMachineMoney;
  #vendingMachineCoinMap;


  constructor() {
    this.#vendingMachine = new VendingMachine();
  }

  async boot() {
    await this.getVendingMachineMoney();
    OutputView.printBlank();
    const coinGenerator = new CoinGenerator(this.#vendingMachineMoney);
    const map = coinGenerator.getRandomCoinsMap();
    this.#vendingMachineCoinMap = map;
    OutputView.printVendingMachineCoinsStatus(Array.from(map));
    await this.getItems();
    await this.start(); // 아이템 세팅 끝난 후 투입금액 체인 시작
  }

  async start() {
    const inputMoney = await this.getInputMoney();
    
    
    

  }

  async getVendingMachineMoney() {
    try {
      const vendingMachineMoney = await InputView.readVendingMachineMoney();
      this.#vendingMachineMoney = vendingMachineMoney;
    } catch (error) {

    }
  }

  async getItems() {
    try {
      const items = await InputView.readItems();
      this.#vendingMachine.setItems(items);
    } catch (error) {

    }
  }

  async getInputMoney() {
    try {
      const inputMoney = InputView.readInputMoney();
      this.#vendingMachine.setInputMoney(inputMoney);

      return inputMoney; 
    } catch (error) {

    }
  }

  async getBuyItem() {
    try {

    } catch (error) {

    }
  }

  showChanges() {

  }

}

export default Controller;
