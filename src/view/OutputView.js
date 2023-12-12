import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printCoinStatus(array) {
    Console.print('자판기가 보유한 동전');
    
    array.forEach((element) => {
      const [coin, amount] = element;
      Console.print(`${coin}원 - ${amount}개`);
    });
    Console.print('');
  },

  printInputPrice(inputPrice) {
    Console.print(`투입 금액: ${inputPrice}원`);
  },

  printChanges(array) {
    Console.print('잔돈\n');
    array.forEach((element) => {
      const [coin, count] = element;
      Console.print(`${coin}원 - ${count}개`);
    });
  },

  printBlank() {
    Console.print('');
  },

  printError(error) {
    Console.print(`${error}`);
  },
};

export default OutputView;
