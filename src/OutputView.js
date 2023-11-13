import { Console } from "@woowacourse/mission-utils";
import { ANSWER } from "./constants/PlannerMesseage.js";
import { PRICE_REFINER, BENEFITS_REFINER } from "./constants/ViewRefiner.js";

const OutputView = {
  printIntroduce() {
    Console.print(ANSWER.introduce);
  },
  
  printProlog(date) {
    Console.print(`${ANSWER.prolog(date)}\n`);
  },

  printOrderMenuResult(foodsArray) {
    Console.print(ANSWER.orderMenu);

    foodsArray.forEach((food) => Console.print(food));
    Console.print('');
  },

  printTotalOrderAmountResult(amount) {
    Console.print(ANSWER.totalOrderAmount); 
    
    Console.print(PRICE_REFINER.positive(amount));
    Console.print('');
  },

  printFreebieMenuResult(freebieMenu) {
    Console.print(ANSWER.freebieMenu);

    Console.print(freebieMenu);
    Console.print('');
  },

  printBenefitListResult(benefitArray) {
    Console.print(ANSWER.benefitList);

    BENEFITS_REFINER.benfitList(benefitArray).forEach((benefit) => Console.print(benefit));
    Console.print('');
  },

  printTotalBenefitAmountResult(totalBenefitAmount) {
    Console.print(ANSWER.totalBenefitAmount);

    Console.print(PRICE_REFINER.negative(totalBenefitAmount));
    Console.print('');
  },

  printFinalPaymentAmountResult(finalPaymentAmount) {
    Console.print(ANSWER.finalPaymentAmount);

    Console.print(PRICE_REFINER.positive(finalPaymentAmount));
    Console.print('');
  },

  printBadgeResult(badge) {
    Console.print(ANSWER.DecemberEventBadge);

    Console.print(badge);
  },
  
  printErrorMesseage(messeage) {
    Console.print(`${messeage}`);
  }
};

export default OutputView;
