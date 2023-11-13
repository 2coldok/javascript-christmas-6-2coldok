import Food from "./Food.js";
import CustomError from "../error/CustomError.js";
import { ERROR_MENU } from "../constants/ErrorMesseage.js";
import { merageFoodInfo } from "../constants/ViewRefiner.js";

class Cashier {
  #foods = [];

  constructor(orderHistory) {
    this.#enrollFoods(orderHistory);
    this.#orderValidator();
  }

  #enrollFoods(orderHistory) {
    orderHistory
      .split(',')
      .forEach((food) => this.#foods.push(new Food(food)));
  }

  #orderValidator() {
    const drinkTypeFoodList = this.#foods.filter((food) => food.type() === 'drink');
    const foodNameList = this.#foods.map((food) => food.name());
    if (
      this.#foods.length === drinkTypeFoodList.length ||
      foodNameList.length !== new Set(foodNameList).size ||
      this.totalFoodsQuantity() > ERROR_MENU.maxOrder
    ) {
      throw new CustomError(ERROR_MENU.basic);
    }
  }

  foodsListWithQuantity() {
    return this.#foods.map((foodInfo) => merageFoodInfo(foodInfo.name(), foodInfo.quantity()));
  }

  totalFoodsQuantity() {
    return this.#foods.reduce((acc,cur) => acc + cur.quantity(), 0);
  }

  totalFoodsPrice() {
    return this.#foods.reduce((acc, cur) => acc + cur.totalPrice(), 0); 
  }

  totalTypeQuantity(foodType) {
    return this.#foods
      .filter((food) => food.type() === foodType)
      .reduce((acc, cur) => acc + cur.quantity(), 0);
  }
}

export default Cashier;
