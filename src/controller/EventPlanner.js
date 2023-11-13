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

  plannerResult() {
    OutputView.printProlog(this.#supervisor.event().date());
    this.orderMenu();
    this.totalOrderAmount();
    this.freebieMenu();
    this.benefitList();
    this.totalBenefitAmount();
    this.finalPaymentAmount();
    this.badge();
  }
  
  orderMenu() {
    OutputView.printOrderMenuResult(this.#supervisor.cashier().foodsListWithQuantity());
  }

  totalOrderAmount() {
    OutputView.printTotalOrderAmountResult(this.#supervisor.cashier().totalFoodsPrice());
  }

  freebieMenu() {
    OutputView.printFreebieMenuResult(this.#supervisor.cashier().freebieMenu());
  }

  benefitList() {
    OutputView.printBenefitListResult(this.#supervisor.benefitList());
  }

  totalBenefitAmount() {
    OutputView.printTotalBenefitAmountResult(this.#supervisor.totalBenefitAmount());
  }

  finalPaymentAmount() {
    OutputView.printFinalPaymentAmountResult(this.#supervisor.finalPaymentAmount());
  }

  badge() {
    OutputView.printBadgeResult(this.#supervisor.giveBadge());
  }
}

export default EventPlanner;
