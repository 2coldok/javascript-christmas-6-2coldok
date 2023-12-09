import Order from "../domain/Order.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class PlannerController {
  #order;

  constructor() {
    this.#order = new Order();
  }

  async boot() {
    OutputView.printIntroduce();
    await this.getDate();
    await this.getMenus();
    this.#order.setBenfits();
    this.showResult();
  }

  async getDate() {
    try {
      const date = await InputView.readDate();
      this.#order.setDate(date);
    } catch (error) {
      OutputView.printError(error);
      await this.getDate();
    }
  }

  async getMenus() {
    try {
      const menus = await InputView.readOrders();
      this.#order.setFoods(menus);      
    } catch (error) {
      OutputView.printError(error);
      await this.getMenus(); 
    }
  }

  showResult() {
    OutputView.printProlog(this.#order.getDate());
    OutputView.printOrderMenu(this.#order.getOrderMenu());
    OutputView.printTotalOrderPrice(this.#order.getTotalOrderPrice());
    OutputView.printFreebieMenu(this.#order.getFreebieMenu());
    OutputView.printBenefitsList(this.#order.getBenefitList());
    OutputView.printTotalBenefitPrice(this.#order.getTotalBenefitPrice());
    OutputView.printPaymentPrice(this.#order.getPaymentPrice());
    OutputView.printBadge(this.#order.getBadge());
  }
}

export default PlannerController;
