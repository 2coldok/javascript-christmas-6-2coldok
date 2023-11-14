import Food from "./Food.js";
import { ERROR_MENU } from "../constants/ErrorMesseage.js";
import { merageFoodInfo } from "../constants/ViewRefiner.js";
import { DISCOUNT, BENEFIT_MESSEAGE } from "../constants/BenefitStorage.js";
import { NAME } from "../constants/FoodStorage.js";

class Cashier {
  #foods = [];

  constructor(orderHistory) {
    this.#enrollFoods(orderHistory);
    this.#orderDuplicationValidator();
    this.#onlyDrinkValidator();
    this.#orderMaxValidator();
  }

  #enrollFoods(orderHistory) {
    orderHistory
      .split(',')
      .forEach((food) => this.#foods.push(new Food(food)));
  }

  #orderDuplicationValidator() {
    const foodNameList = this.#foods.map((food) => food.name());
    if (foodNameList.length !== new Set(foodNameList).size) {
      throw new Error(ERROR_MENU.basic);
    }
  }

  #onlyDrinkValidator() {
    const drinkTypeFoodsList = this.#foods.filter((food) => food.type() === NAME.drink);

    if (drinkTypeFoodsList.length === this.#foods.length) {
      throw new Error(ERROR_MENU.onlyDrink);
    }
  }

  #orderMaxValidator() {
    if (this.#totalFoodsQuantity() > ERROR_MENU.maxOrderNumber) {
      throw new Error(`${ERROR_MENU.maxOrder}\n${ERROR_MENU.orderAmountExample}`);
    }
  }

  #totalFoodsQuantity() {
    return this.#foods.reduce((acc,cur) => acc + cur.quantity(), 0);
  }

  foodsListWithQuantity() {
    return this.#foods.map((foodInfo) => merageFoodInfo(foodInfo.name(), foodInfo.quantity()));
  }

  totalFoodsPrice() {
    return this.#foods.reduce((acc, cur) => acc + cur.totalPrice(), 0); 
  }

  totalTypeQuantity(foodType) {
    return this.#foods
      .filter((food) => food.type() === foodType)
      .reduce((acc, cur) => acc + cur.quantity(), 0);
  }

  freebieMenu() {
    if (this.totalFoodsPrice() > DISCOUNT.freebieStandard) {
      return DISCOUNT.freebieItem;
    }
    return BENEFIT_MESSEAGE.non;
  }
}

export default Cashier;
