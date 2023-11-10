import BenefitSupervisor from "../domain/BenefitSupervisor.js";
import EventCounter from "../domain/EventCounter.js";
import FoodCounter from "../domain/FoodCounter.js";
import { OUTPUT_REFINER } from "../constants/ViewRefiner.js";
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
      new EventCounter(this.date)

      await this.getMenu();
    } catch (error) {
      OutputView.printErrorMesseage(error);
      await this.getDate();
    }  
  }

  async getMenu() {
    try {
      this.menu = await InputView.readMenu();
      new FoodCounter(this.menu);

      this.readClientData();
    } catch (error) {
      OutputView.printErrorMesseage(error);
      await this.getMenu();
    }
  }

  readClientData() {
    OutputView.printProlog(this.date);

    this.benefitSupervisor = new BenefitSupervisor(this.date, this.menu);
    
    
  }
}

export default EventPlanner;

const a = new EventPlanner;
a.start();