import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printTemplete() {
    Console.print('#############################################');
    Console.print('과정: 백엔드 | 프론트엔드');
    Console.print('미션:');
    const array = ['  - 레벨1: 자동차경주 | 로또 | 숫자야구게임', '  - 레벨2: 장바구니 | 결제 | 지하철노선도', '  - 레벨3:', '  - 레벨4: 성능개선 | 배포', '  - 레벨5:'];
    array.forEach((element) => Console.print(element));
    Console.print('#############################################');
  },
  
  printPairMatchingResult(array) {
    Console.print('페어 매칭 결과입니다.');
    array.forEach((pair) => {
      Console.print(`${pair.join(' : ')}`);
    });
    
    Console.print('');
  },

};

export default OutputView;