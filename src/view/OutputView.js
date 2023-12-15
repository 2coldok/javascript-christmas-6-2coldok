import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printTemplete() {
    Console.print('');
    Console.print('#############################################');
    Console.print('과정: 백엔드 | 프론트엔드\n미션:\n');
    Console.print('  - 레벨1: 자동차경주 | 로또 | 숫자야구게임\n  - 레벨2: 장바구니 | 결제 | 지하철노선도\n  - 레벨3:\n  - 레벨4: 성능개선 | 배포\n  - 레벨5:\n');
    Console.print('#############################################');
  },
  
  printPairs(pairs) {
    Console.print('');
    Console.print('페어 매칭 결과입니다.');
    pairs.forEach((pair) => Console.print(pair.join(' : ')));
    Console.print('');
  },

  printReset() {
    Console.print('\n초기화 되었습니다.\n');
  },

  printError(error) {
    Console.print(`${error}`);
  },

  printBlank() {
    Console.print('');
  },
};

export default OutputView;
