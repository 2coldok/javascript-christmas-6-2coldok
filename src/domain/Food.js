
import CustomError from "../error/CustomError.js";
import { ERROR_MENU } from "../constants/ErrorMesseage.js";
import {
  MENU,
  NAME,
  REGEX
 } from "../constants/FoodStorage.js";

import { foodValidator } from "../util/Validator.js";

 // input : 크리스마스스파게티-10

class Food {
  #name;

  #quantity;

  constructor(food) {
    foodValidator(this.#enrollFood(food));
  }
  
  #category() {
    const [foodTypeInfo] = MENU
      .filter((foodTypeInfo) => foodTypeInfo.hasOwnProperty(this.#name));
  
    return foodTypeInfo;
  }
 
  #enrollFood(food) {
    const foodInfoArray = food.split('-'); //상수처리
    this.#name = foodInfoArray[0]
    this.#quantity = Number(foodInfoArray[1])

    return foodInfoArray;
  }

  type() {
    return this.#category()[NAME.type];
  }

  name() {
    return this.#name;
  }

  price() {
    return this.#category()[this.#name]
  }

  quantity() {
    return this.#quantity;
  }

  totalPrice() {
    return this.price() * this.quantity();
  }
}

export default Food
