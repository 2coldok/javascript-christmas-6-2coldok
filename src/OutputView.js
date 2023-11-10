import { Console } from "@woowacourse/mission-utils";
import { ANSWER } from "./constants/PlannerMesseage.js";

const OutputView = {
  printIntroduce() {
    Console.print(ANSWER.introduce);
  },
  
  printProlog(date) {
    Console.print(`${ANSWER.prolog(date)}\n`);
  },

  printOrderMenu() {
    Console.print(ANSWER.orderMenu);       
  },

  printTotalOrderAmount() {
    Console.print(ANSWER.totalOrderAmount);
  },

  printFreebieMenu() {
    Console.print(ANSWER.freebieMenu);
  },

  printBenefitList() {
    Console.print(ANSWER.benefitList);
  },

  printTotalBenefitAmount() {
    Console.print(ANSWER.totalBenefitAmount);
  },

  printFinalPaymentAmount() {
    Console.print(ANSWER.finalPaymentAmount);
  },

  printBadge() {
    Console.print(ANSWER.DecemberEventBadge);
  },
  
  printBlank() {
    Console.print('');
  },

  printErrorMesseage(messeage) {
    Console.print(`${messeage}`);
  }
};

export default OutputView;
