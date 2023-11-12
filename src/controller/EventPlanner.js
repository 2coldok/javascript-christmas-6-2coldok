
import BenefitSupervisor from "../domain/BenefitSupervisor.js";
import Event from "../domain/Event.js";
import Cashier from "../domain/Cashier.js";
import InputView from "../InputView.js";
import OutputView from "../OutputView.js";

class EventPlanner {
  date;

  menu;

  benefitSupervisor;

  async start() {
    OutputView.printIntroduce();
  
    
    await this.getDate();
  }
  
  async getDate() {
    try {
      this.date = await InputView.readDate();
      /*new EventCounter(this.date)*/
    
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
    this.benefitSupervisor = new BenefitSupervisor(this.date, this.menu);
    this.plannerResult();
  }
  
  plannerResult() {
    OutputView.printProlog(this.date);

    OutputView.printOrderMenu();
    OutputView.printOrderMenuResult(this.benefitSupervisor.orderMenu());

    OutputView.printTotalOrderAmount();
    OutputView.printTotalOrderAmountResult(this.benefitSupervisor.totalOrderAmountBeforeDiscount());

    OutputView.printFreebieMenu();
    OutputView.printFreebieMenuResult(this.benefitSupervisor.freebieMenu());

    OutputView.printBenefitList();
    OutputView.printBenefitListResult(this.benefitSupervisor.benefitList());

    OutputView.printTotalBenefitAmount();
    OutputView.printTotalBenefitAmountResult(this.benefitSupervisor.totalBenefitAmount());

    OutputView.printFinalPaymentAmount();
    OutputView.printFinalPaymentAmountResult(this.benefitSupervisor.finalPaymentAmount());

    OutputView.printBadge();
    OutputView.printBadgeResult(this.benefitSupervisor.giveBadge());
  } 
}

export default EventPlanner;
