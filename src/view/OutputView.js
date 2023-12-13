import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printVendingMachineCoinsStatus(array) {
    Console.print('자판기가 보유한 동전');
    array.forEach(([coin, amount]) => {
      Console.print(`${coin}원 - ${amount}개`);
    });
    
    Console.print('');
  },

  printInputMoney(inputMoney) {
    Console.print(`투입 금액: ${inputMoney}원\n`);
  },
  

  // 마지막 최종 결과 출력 부분
  printChanges(array) {
    Console.print('잔돈\n');
    array.forEach(([coin, amount]) => {
      Console.print(`${coin}원 - ${amount}개`);
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
