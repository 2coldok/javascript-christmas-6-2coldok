import VendingMachine from "../domain/VendingMachine.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  #vendingMachine;

  constructor() {
    this.#vendingMachine = new VendingMachine();
  }

  async boot() {
    
  }

  async consuming() {

  }

  
  async getVendingMachinePrice() {
    try {
      const price = await InputView.readVendingMachinePrice();
      this.#vendingMachine.setVendingMachinPrice(price);
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

  async getInputPrice() {
    try {
      const price = await InputView.readInputPrice();


    } catch (error) {

    }
  }

  async getItem() {
    try {

    } catch (error) {

    }
  }
}

export default Controller;