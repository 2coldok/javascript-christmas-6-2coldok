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
    const foodList = this.#foods.map((foodInfo) => {
      return merageFoodInfo(foodInfo.name(), foodInfo.quantity());
    });
    
    return foodList;
  }

  totalFoodsQuantity() {
    const quantity = this.#foods.reduce((acc,cur) => {
      return acc + cur.quantity();
    }, 0);

    return quantity;
  }

  totalFoodsPrice() {
    const price = this.#foods.reduce((acc, cur) => {
      return acc + cur.totalPrice();
    }, 0);

    return price;
  }

  totalTypeQuantity(foodType) {
    const typeQuantityList = this.#foods
      .filter((food) => food.type() === foodType);
    
    return typeQuantityList.reduce((acc, cur) => {
      return acc + cur.quantity();
    }, 0); 
  }
}

export default Cashier;
