
import Supervisor from "../domain/Supervisor.js";
import Event from "../domain/Event.js";
import Cashier from "../domain/Cashier.js";
import InputView from "../InputView.js";
import OutputView from "../OutputView.js";

class EventPlanner {
  #supervisor;
  
  async start() {
    OutputView.printIntroduce();

    const date = await this.getDate();
    const menu = await this.getMenu();

    this.#supervisor = new Supervisor(date, menu);
    this.plannerResult(); 
  }

  async getDate() {
    try {
      this.date = await InputView.readDate();
      new Event(this.date);

      return this.date;
    } catch (error) {
      OutputView.printErrorMesseage(error);
      return await this.getDate();
    }  
  }

  async getMenu() {
    try {
      this.menu = await InputView.readMenu();
      new Cashier(this.menu);

      return this.menu;
    } catch (error) {
      OutputView.printErrorMesseage(error);
      return await this.getMenu();
    }
  }

  plannerResult() {
    OutputView.printProlog(this.date);

    OutputView.printOrderMenu();
    OutputView.printOrderMenuResult(this.#supervisor.orderMenu());

    OutputView.printTotalOrderAmount();
    OutputView.printTotalOrderAmountResult(this.#supervisor.totalOrderAmountBeforeDiscount());

    OutputView.printFreebieMenu();
    OutputView.printFreebieMenuResult(this.#supervisor.freebieMenu());

    OutputView.printBenefitList();
    OutputView.printBenefitListResult(this.#supervisor.benefitList());

    OutputView.printTotalBenefitAmount();
    OutputView.printTotalBenefitAmountResult(this.#supervisor.totalBenefitAmount());

    OutputView.printFinalPaymentAmount();
    OutputView.printFinalPaymentAmountResult(this.#supervisor.finalPaymentAmount());

    OutputView.printBadge();
    OutputView.printBadgeResult(this.#supervisor.giveBadge());
  }
  
  orderMenu() {

  }

  totalOrderAmount() {

  }

  freebieMenu() {

  }

  benefitList() {

  }

  totalBenefitAmount() {

  }

  finalPaymentAmount() {

  }

  badge() {

  }
}

export default EventPlanner;
