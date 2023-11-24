import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "../constants/Messeage.js";
import { traceFilter } from "../constants/Formatter.js";
import { successFilter } from "../constants/Formatter.js";
/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputVieww = {
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printProlog() {
    Console.print(`${OUTPUT.prolog}\n`);
  },

  printMap(trace) {
    const array = traceFilter(trace);
    array.forEach((element) => Console.print(element));
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(trace) {
    Console.print(OUTPUT.gameTraceResult);
    const array = traceFilter(trace);
    array.forEach((element) => Console.print(element));
    Console.print('');
  },

  printFinalStatus(status, cycle) {
    const result = successFilter(status);
    Console.print(`${OUTPUT.gameSuccessResult}${result}`);
    Console.print(`${OUTPUT.cycle}${cycle}`);
  },

  printErrorMesseage(messeage) {
    Console.print(`${messeage}`); 
  },

  printBlank() {
    Console.print('');
  }
};

export default OutputVieww;
