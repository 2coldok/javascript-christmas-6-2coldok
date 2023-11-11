
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
  #food;

  #quantity;

  #myType;

  constructor(food) {
    foodValidator(this.#foodInfoSetting(food));
    this.#searchType();
    this.#foodNonValidator();
  }

  #searchType() {
    const [foodType] = MENU
      .filter((foodType) => foodType.hasOwnProperty(this.#food));
    
    this.#myType = foodType; // 메뉴에 없는 음식일 경우 this.#myType 은 undefined 된다.
  }

  #foodNonValidator() { // 메뉴에 없는 음식 또는 수량이 0개일때 에러
    if (!this.#myType || this.#quantity === 0) {
      throw new CustomError(ERROR_MENU.basic);
    }
  }

  #foodInfoSetting(food) {
    const foodInfoArray = food.split('-'); //상수처리
    this.#food = foodInfoArray[0]
    this.#quantity = Number(foodInfoArray[1])

    return foodInfoArray;
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

/*
const food = new Food('양송수프-10');
console.log(food.type());
console.log(food.name());
console.log(food.price());
console.log(food.quantity());
console.log(food.totalPrice());
*/