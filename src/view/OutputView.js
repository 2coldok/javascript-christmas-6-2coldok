import { Console } from "@woowacourse/mission-utils";
import { negativePrice, positivePrice } from "../constants/Benefits.js";

const OutputView = {
  printIntroduce() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printProlog(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },

  printOrderMenu(ordersArray) {
    Console.print('<주문 메뉴>');
    ordersArray.forEach((order) => Console.print(order));
    Console.print('');
  },

  printTotalOrderPrice(price) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(positivePrice(price));
    Console.print('');
  },

  printFreebieMenu(input) {
    Console.print('<증정 메뉴>');
    Console.print(input);
    Console.print('');
  },

  printBenefitsList(benefits) {
    Console.print('<혜택 내역>');
    if (benefits.includes('없음')) {
      return Console.print('없음\n');
    }
    benefits.forEach((element) => {
      const [benefit, price] = element;
      Console.print(`${benefit}${negativePrice(price)}`);
    });
    Console.print('');
  },

  printTotalBenefitPrice(price) {
    Console.print('<총혜택 금액>');
    if (price === 0) {
        return Console.print(`${positivePrice(price)}\n`);
    }
    Console.print(negativePrice(price));
    Console.print('');
  },

  printPaymentPrice(price) {
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${positivePrice(price)}\n`);
  },

  printBadge(badge) {
    Console.print('<12월 이벤트 배지>');
    Console.print(badge);
  },

  printError(error) {
    Console.print(`${error}`);
  },
};

export default OutputView;
