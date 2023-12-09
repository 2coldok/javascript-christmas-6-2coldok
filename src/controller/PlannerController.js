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
    const date = await this.getDate();
    await this.getOrder();
    this.showResult(date);
  }

  async getDate() {
    try {
      const date = await InputView.readDate();
      this.#order.setDate(date);
      return date;
    } catch (error) {
      OutputView.printError(error);
      return await this.getDate();
    }
  }

  async getOrder() {
    try {
      const menus = await InputView.readOrder();
      this.#order.setOrder(menus);
    } catch (error) {
      OutputView.printError(error);
      return await this.getOrder();
    }
  }
  
  showResult(date) {
    OutputView.printProlog(date);
    OutputView.printOrderMenu(this.#order.getOrderMenu());
    OutputView.printTotalOrderPrice(this.#order.getTotalOrderPrice());
    OutputView.printFreebieMenu(this.#order.getFreebieMenu());
    OutputView.printBenefitList(this.#order.getBenefitList());
    OutputView.printTotalBenefitPrice(this.#order.getTotalBenefitDiscount());
    OutputView.printPaymentPrice(this.#order.getPaymentPrice());
    OutputView.printBadge(this.#order.getBadge());
  }

}

export default PlannerController;