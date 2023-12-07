import { MENU, TYPE } from "../constants/MenuBoard.js";

class Food {
#name;
#amount;
  // 타파스-2
  constructor(foodInfo) {
   this.#cook(foodInfo); 
  }

  #cook(foodInfo) {
    const [name, amount] = foodInfo.split('-');
    this.#name = name;
    this.#amount = amount;
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