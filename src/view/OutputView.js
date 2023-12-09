import { Console } from "@woowacourse/mission-utils";

const priceFilter = (price) => new Intl.NumberFormat('ko-KR').format(price);

const OutputView = {
  printIntroduce() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printProlog(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },
  
  printOrderMenu(array) {
    Console.print('<주문 메뉴>');
    array.forEach((element) => {
      const [name, amount] = element;
      Console.print(`${name} ${amount}개`);
    });
    Console.print('');
  },

  printTotalOrderPrice(price) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${priceFilter(price)}원\n`);
  },

  printFreebieMenu(freebie) {
    Console.print('<증정 메뉴>');
    Console.print(`${freebie}\n`);
  },

  printBenefitList(benefits) {
    Console.print('<혜택 내역>');
    if (benefits.includes('없음')) {
      return this.printNonBenefitList();
    }
    benefits.forEach((element) => {
      const [eventName, discount] = element;
      Console.print(`${eventName}: -${priceFilter(discount)}원`);
    });
    Console.print('');
  },

  printNonBenefitList() {
    Console.print('없음');
    Console.print('');
  },

  printTotalBenefitPrice(price) {
    Console.print('<총혜택 금액>');
    if (price === 0) {
      Console.print('0원');    
    } else {
      Console.print(`-${priceFilter(price)}원`);
    }
    Console.print('');
  },

  printPaymentPrice(price) {
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${priceFilter(price)}원\n`);
  },

  printBadge(badge) {
    Console.print('<12월 이벤트 배지>');
    Console.print(`${badge}`);
  },

  printError(error) {
    Console.print(`${error}`);
  },
};

export default OutputView;
