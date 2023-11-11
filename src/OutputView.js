import { Console } from "@woowacourse/mission-utils";
import { ANSWER } from "./constants/PlannerMesseage.js";
import { OUTPUT_REFINER } from "./constants/ViewRefiner.js";

const OutputView = {
  printIntroduce() {
    Console.print(ANSWER.introduce);
  },
  
  printProlog(date) {
    Console.print(`${ANSWER.prolog(date)}\n`);
  },

  printOrderMenu() { //주문한 메뉴
    Console.print(ANSWER.orderMenu);       
  },

  printOrderMenuResult(foodsArray) {
    foodsArray.forEach((food) => Console.print(food));
    Console.print('');
  },

  printTotalOrderAmount() { // 할일전 주문총금액
    Console.print(ANSWER.totalOrderAmount);
  },

  printTotalOrderAmountResult(amount) { 
    Console.print(OUTPUT_REFINER.positivePrice(amount));
    Console.print('');
  },

  printFreebieMenu() { //증정 메뉴(샴페인)
    Console.print(ANSWER.freebieMenu);
  },

  printFreebieMenuResult(freebieMenu) {
    Console.print(freebieMenu);
    Console.print('');
  },

  printBenefitList() { // 해택 내역
    Console.print(ANSWER.benefitList);
  },

  printBenefitListResult(benefitArray) {
    OUTPUT_REFINER.benfit(benefitArray).forEach((benefit) => Console.print(benefit));
    Console.print('');
  },

  printTotalBenefitAmount() { // 총 해택금액
    Console.print(ANSWER.totalBenefitAmount);
  },

  printTotalBenefitAmountResult(totalBenefitAmount) {
    Console.print(OUTPUT_REFINER.negativePrice(totalBenefitAmount));
    Console.print('');
  },

  printFinalPaymentAmount() { //최종 결재금액
    Console.print(ANSWER.finalPaymentAmount);
  },

  printFinalPaymentAmountResult(finalPaymentAmount) {
    Console.print(OUTPUT_REFINER.positivePrice(finalPaymentAmount));
    Console.print('');
  },

  printBadge() { //뱃지
    Console.print(ANSWER.DecemberEventBadge);
  },

  printBadgeResult(badge) {
    Console.print(badge);
  },
  
  printBlank() {
    Console.print('');
  },

  printErrorMesseage(messeage) {
    Console.print(`${messeage}`);
  }
};

export default OutputView;
