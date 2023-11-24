import { Console } from "@woowacourse/mission-utils";
import { INPUT } from "../constants/Messeage.js";
import { spaceFilter } from "../constants/Formatter.js";

const InputVieww = {
  /**
   * 다리의 길이를 입력받는다.
   */
  async  readBridgeSize() {
    return await Console.readLineAsync(`${INPUT.bridgeLength}\n`);  
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  async readMoving() {
    const space = await Console.readLineAsync(`${INPUT.choiceSpace}\n`);
    return spaceFilter(space);
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  async readGameCommand() {
    return await Console.readLineAsync(`${INPUT.choiceRetry}\n`);
  },
};

export default InputVieww;
