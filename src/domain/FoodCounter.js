import Food from "./Food.js";
import { entireFoodsValidator } from "../util/Validator.js";
import CustomError from "../error/CustomError.js";
import { ERROR_MENU } from "../constants/ErrorMesseage.js";
// 
class FoodCounter {
  #foods = [];

  constructor(foodsString) {
    /*entireFoodsValidator(foodsString);*/
    this.#foodsSetting(foodsString);
    this.#foodsValidator();
  }

  #foodsSetting(foodsString) {
    foodsString
      .split(',')
      .forEach((foodString) => this.#foods.push(new Food(foodString)));
  }

  #foodsValidator() {
    const drinkTypeFoodList = this.#foods.filter((food) => food.type() === 'drink');
    const foodNameList = this.#foods.map((food) => food.name());

    if (
      this.#foods.length === drinkTypeFoodList.length ||
      foodNameList.length !== new Set(foodNameList).size ||
      this.totalFoodsQuantity() > 20
    ) {
      throw new CustomError(ERROR_MENU.basic);
    }
  }

  foodsListWithQuantity() {
    const foodList = this.#foods.map((foodInfo) => {
      return foodInfo.name() + ' ' + foodInfo.quantity() + '개';
    })
    
    return foodList;
  }

  totalFoodsQuantity() {
    const quantity = this.#foods.reduce((acc,cur) => {
      return acc + cur.quantity();
    }, 0)

    return quantity;
  }

  totalFoodsPrice() {
    const price = this.#foods.reduce((acc, cur) => {
      return acc + cur.totalPrice();
    }, 0)

    return price;
  }

  totalTypeQuantity(foodType) {
    const quantityInfo = this.#foods
      .filter((foodInfo) => foodInfo.type() === foodType);
    
    return quantityInfo.reduce((acc, cur) => {
      return acc + cur.quantity()
    }, 0) 
  }
}

export default FoodCounter;

/*
const a = new FoodCounter('제로콜라-10,레드와인-1,초코케이크-a');
console.log(a.foodsListWithQuantity());*/
