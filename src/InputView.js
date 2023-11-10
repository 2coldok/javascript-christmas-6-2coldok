import { Console } from "@woowacourse/mission-utils";
import { QUESTION } from "./constants/PlannerMesseage.js";

const InputView = {
  async readDate() {
    return await Console.readLineAsync(QUESTION.date);
  },
    
  async readMenu() {
    return await Console.readLineAsync(QUESTION.menu);
  },
};

export default InputView;
