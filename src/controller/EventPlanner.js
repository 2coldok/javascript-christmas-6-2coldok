
import Supervisor from "../domain/Supervisor.js";
import Event from "../domain/Event.js";
import Cashier from "../domain/Cashier.js";
import InputView from "../InputView.js";
import OutputView from "../OutputView.js";

class EventPlanner {
  date;

  menu;

  supervisor;

  async start() {
    OutputView.printIntroduce();
  
    
    await this.getDate();
  }
  
  async getDate() {
    try {
      this.date = await InputView.readDate();
      new Event(this.date);

      await this.getMenu();
    } catch (error) {
      OutputView.printErrorMesseage(error);
      await this.getDate();
    }  
  }

  async getMenu() {
    try {
      this.menu = await InputView.readMenu();
      new Cashier(this.menu);

      this.readClientData();
    } catch (error) {
      OutputView.printErrorMesseage(error);
      await this.getMenu();
    }
  }

  readClientData() {
    this.supervisor = new Supervisor(this.date, this.menu);
    this.plannerResult();
  }
  
  plannerResult() {
    OutputView.printProlog(this.date);

    OutputView.printOrderMenu();
    OutputView.printOrderMenuResult(this.supervisor.orderMenu());

    OutputView.printTotalOrderAmount();
    OutputView.printTotalOrderAmountResult(this.supervisor.totalOrderAmountBeforeDiscount());

    OutputView.printFreebieMenu();
    OutputView.printFreebieMenuResult(this.supervisor.freebieMenu());

    OutputView.printBenefitList();
    OutputView.printBenefitListResult(this.supervisor.benefitList());

    OutputView.printTotalBenefitAmount();
    OutputView.printTotalBenefitAmountResult(this.supervisor.totalBenefitAmount());

    OutputView.printFinalPaymentAmount();
    OutputView.printFinalPaymentAmountResult(this.supervisor.finalPaymentAmount());

    OutputView.printBadge();
    OutputView.printBadgeResult(this.supervisor.giveBadge());
  } 
}

export default EventPlanner;
