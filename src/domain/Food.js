import { MENU, TYPE } from "../constants/MenuBoard.js";
const NUMBER = /^[0-9]*$/;

class Food {
#name;
#amount;
  // 타파스-2
  constructor(foodInfo) {
    this.#foodInfoFormValidator(foodInfo);
    this.#cook(foodInfo);
    this.#nonFoodValidator(); 
    this.#minFoodAmountValidator();
  }

  #cook(foodInfo) {
    const [name, amount] = foodInfo.split('-');
    this.#name = name;
    this.#amount = Number(amount);
  }

  #nonFoodValidator() {
    if (this.getType() === undefined) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(메뉴에 없는 음식)');
    }
  }

  #minFoodAmountValidator() {
    if (this.getAmount() < 1) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(음식 수량중에 1보다 작은게 있음)');
    }
  }

  #foodInfoFormValidator(foodInfo) {
    if (
      !foodInfo.includes('-') ||
      foodInfo.split('-').length !== 2 
    ) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(형식 오류1)');
    }
    const [foodName, amount] = foodInfo.split('-');
    if (!NUMBER.test(amount)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(형식 오류2)');
    }

    
  }

  getName() {
    return this.#name
  }

  getAmount() {
    return this.#amount;
  }

  getType() {
    const type = [];
    for (let i = 0; i < MENU.size; i++) {
      if (Object.hasOwn(MENU.get(i), this.#name)) {
        type.push(TYPE.get(i));
        break;
      }
    }
    return type.at(-1);
  }

  getPrice() {
    const price = [];
    for (let i = 0; i < MENU.size; i++) {
      if (Object.hasOwn(MENU.get(i), this.#name)) {
        price.push(MENU.get(i)[this.#name]);
        break;
      }
    }
    return price.at(-1) * this.#amount;
  }
}

export default Food;
/*
const a = new Food('크리스마스파스타-4');
console.log(a.getName());
console.log(a.getAmount());
console.log(a.getType());
console.log(a.getPrice());*/