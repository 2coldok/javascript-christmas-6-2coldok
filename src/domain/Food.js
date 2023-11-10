import { unitFoodValidator } from "../util/Validator.js";
import {
  MENU,
  NAME,
  REGEX
 } from "../constants/FoodStorage.js";

 // input : 크리스마스스파게티-10

class Food {
  #food;

  #myType;

  #quantity;
  
  constructor(food) {
    unitFoodValidator(food);
    this.#food = food.replace(REGEX.notHangle, '');
    this.#quantity = Number(food.replace(REGEX.notNumber, ''));
    this.#searchType();
  }

  #searchType() {
    const [foodType] = MENU.filter((foodType) => {
      const map = new Map(Object.entries(foodType));

      return map.has(this.#food);
    })

    this.#myType = foodType;
  }

  type() {
    return this.#myType[NAME.type];
  }

  name() {
    return this.#food;
  }

  price() {
    return this.#myType[this.#food];
  }

  quantity() {
    return this.#quantity;
  }

  totalPrice() {
    return this.price() * this.quantity();
  }
}

export default Food
/*
const food = new Food('양송이수프-4');
console.log(food.name());
console.log(food.quantity());
console.log(food.price());
console.log(food.type());
*/