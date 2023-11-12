import Supervisor from "../domain/Supervisor.js";
import InputView from "../InputView.js";
import OutputView from "../OutputView.js";

class EventPlanner {
  #supervisor;

  constructor() {
    this.#supervisor = new Supervisor();
  }
  
  async start() {
    OutputView.printIntroduce();
    
    await this.getDate();
    await this.getMenu();

    this.plannerResult(); 
  }

  plannerResult() {
    OutputView.printProlog(this.#supervisor.date());
    this.orderMenu();
    this.totalOrderAmount();
    this.freebieMenu();
    this.benefitList();
    this.totalBenefitAmount();
    this.finalPaymentAmount();
    this.badge();
  }

  async getDate() {
    try {
      this.#supervisor.dateUpload(await InputView.readDate());

    } catch (error) {
      OutputView.printErrorMesseage(error);
      return await this.getDate();
    }  
  }

  async getMenu() {
    try {
      this.#supervisor.menuUpload(await InputView.readMenu());
      
    } catch (error) {
      OutputView.printErrorMesseage(error);
      return await this.getMenu();
    }
  }
  
  orderMenu() {
    OutputView.printOrderMenu();
    OutputView.printOrderMenuResult(this.#supervisor.orderMenu());
  }

  totalOrderAmount() {
    OutputView.printTotalOrderAmount();
    OutputView.printTotalOrderAmountResult(this.#supervisor.totalOrderAmountBeforeDiscount());
  }

  freebieMenu() {
    OutputView.printFreebieMenu();
    OutputView.printFreebieMenuResult(this.#supervisor.freebieMenu());
  }

  benefitList() {
    OutputView.printBenefitList();
    OutputView.printBenefitListResult(this.#supervisor.benefitList());
  }

  totalBenefitAmount() {
    OutputView.printTotalBenefitAmount();
    OutputView.printTotalBenefitAmountResult(this.#supervisor.totalBenefitAmount());
  }

  finalPaymentAmount() {
    OutputView.printFinalPaymentAmount();
    OutputView.printFinalPaymentAmountResult(this.#supervisor.finalPaymentAmount());
  }

  badge() {
    OutputView.printBadge();
    OutputView.printBadgeResult(this.#supervisor.giveBadge());
  }
}

export default EventPlanner;
