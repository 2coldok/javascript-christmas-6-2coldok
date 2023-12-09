import { MENU_BOARD } from "../constants/Menu.js";
import { orderFormValidator } from "../util/Validator.js";

class Food {
  #name;
  #amount;
  
  // '타파스-2'
  constructor(foodData) {
    orderFormValidator(foodData);
    this.#setFood(foodData);
    this.#searchFood();
  }

  #setFood(foodData) {
    const [name, amount] = foodData.split('-');
    this.#name = name;
    this.#amount = Number(amount);
  }

  #searchFood() {
    const check = Object.entries(MENU_BOARD).some((element) => {
      const [type, menus] = element;
      return Object.hasOwn(menus, this.#name);
    });
    if (!check) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(메뉴에 없은 음식 입니다.)');
    }
  }

  getName() {
    return this.#name;
  }

  getAmount() {
    return this.#amount;
  }

  getPrice() {
    const [_, menus] = Object.entries(MENU_BOARD).find((element) => {
      const [type, menus] = element;
      return Object.hasOwn(menus, this.#name)
    });
    
    return menus[this.#name] * this.#amount;
  }

  getType() {
    const [type, _] = Object.entries(MENU_BOARD).find((element) => {
      const [_, menus] = element;
      return Object.hasOwn(menus, this.#name)
    });

    return type;
  }
  
  static getTotalTypeAmount(foods, type) {
    const count = foods.reduce((acc, cur) => {
      if (cur.getType() === type) {
        return acc + cur.getAmount();
      } else {
        return acc + 0;
      }
    }, 0)
    return  count;
  }
}

export default Food;
/*
const food = new Food('초코케이크-2');

console.log(food.getName());
console.log(food.getAmount());
console.log(food.getPrice());
console.log(food.getType());
*/