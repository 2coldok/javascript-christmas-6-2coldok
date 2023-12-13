import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readVendingMachineMoney() {
    const money = await Console.readLineAsync('자판기가 보유하고 있는 금액을 입력해 주세요.\n');
    
    return Number(money);
  },
  
  async readItems() {
    return await Console.readLineAsync('상품명과 가격, 수량을 입력해 주세요.\n');
  },

  async readInputMoney() {
    const money = await Console.readLineAsync('투입 금액을 입력해 주세요.\n');
    
    return Number(money);
  },

  async readBuyItem() {
    return await Console.readLineAsync('구매할 상품명을 입력해 주세요.\n');
  },
};

export default InputView;