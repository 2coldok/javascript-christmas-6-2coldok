import { Console } from "@woowacourse/mission-utils";

const InputView = {
  // 기능을 선택하세요
  async readChoice() {
    return await Console.readLineAsync('기능을 선택하세요.\n1. 페어 매칭\n2. 페어 조회\n3. 페어 초기화\nQ. 종료\n');

  },
  
  async readData() {
    const str = await Console.readLineAsync('과정, 레벨, 미션을 선택하세요.\nex) 백엔드, 레벨1, 자동차경주\n');
    return str.split(', ');
  },
  
  // 예 아니오
  async readYesOrNo() {
    return await Console.readLineAsync('\n매칭 정보가 있습니다. 다시 매칭하시겠습니까?\n네 | 아니오\n');
  },

};

export default InputView;
