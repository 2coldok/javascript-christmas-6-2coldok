import { Console } from "@woowacourse/mission-utils";
import { ANSWER } from "./constants/PlannerMesseage.js";
import { OUTPUT_REFINER } from "./constants/ViewRefiner.js";
import { BENEFIT_MESSEAGE } from "./constants/BenefitStorage.js";

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

  printOrderMenuResult(foodsArray) {
    foodsArray.forEach((food) => Console.print(food));
    Console.print('');
  },

  printTotalOrderAmount() { 
    Console.print(ANSWER.totalOrderAmount);
  },

  printTotalOrderAmountResult(amount) { 
    Console.print(OUTPUT_REFINER.positivePrice(amount));
    Console.print('');
  },

  printFreebieMenu() { 
    Console.print(ANSWER.freebieMenu);
  },

  printFreebieMenuResult(freebieMenu) {
    Console.print(freebieMenu);
    Console.print('');
  },

  printBenefitList() { 
    Console.print(ANSWER.benefitList);
  },

  printBenefitListResult(benefitArray) {
    if (!benefitArray.get('condition')) {
      Console.print(`${BENEFIT_MESSEAGE.non}\n`);
      return;
    }
    const temp = benefitArray;
    temp.delete('condition');
    temp.forEach((value, key, map) => {
      if (value !== 0) {
        Console.print(`${BENEFIT_MESSEAGE[key]}${OUTPUT_REFINER.negativePrice(value)}`)
      }
    }) 
    Console.print('');
  },

  printTotalBenefitAmount() { 
    Console.print(ANSWER.totalBenefitAmount);
  },

  printTotalBenefitAmountResult(totalBenefitAmount) {
    Console.print(OUTPUT_REFINER.negativePrice(totalBenefitAmount));
    Console.print('');
  },

  printFinalPaymentAmount() { 
    Console.print(ANSWER.finalPaymentAmount);
  },

  printFinalPaymentAmountResult(finalPaymentAmount) {
    Console.print(OUTPUT_REFINER.positivePrice(finalPaymentAmount));
    Console.print('');
  },

  printBadge() { 
    Console.print(ANSWER.DecemberEventBadge);
  },

  printBadgeResult(badge) {
    Console.print(badge);
  },
  
  printErrorMesseage(messeage) {
    Console.print(`${messeage}`);
  }
};

export default OutputView;
