import { Console  } from "@woowacourse/mission-utils";

const InputView = {
  // 기능을 선택하세요
  async readChoice() {
    const choice = await Console.readLineAsync('기능을 선택하세요.\n1. 페어 매칭\n2. 페어 조회\n3. 페어 초기화\nQ. 종료\n');
    
    return choice;
  },
  
  // 과정, 레벨 ,미션을 선택하세요
  async readForm() {
    const form = await Console.readLineAsync('과정, 레벨, 미션을 선택하세요.\nex) 백엔드, 레벨1, 자동차경주\n');

    return form;
  },
};

export default InputView;