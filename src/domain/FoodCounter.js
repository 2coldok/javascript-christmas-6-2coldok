import Food from "./Food.js";
import { entireFoodsValidator } from "../util/Validator.js";
import CustomError from "../error/CustomError.js";
import { ERROR_MENU } from "../constants/ErrorMesseage.js";
// 
class FoodCounter {
  #foods = [];

  constructor(foodsString) {
    entireFoodsValidator(foodsString);
    this.#foodsSetting(foodsString);
    this.#businessValidator();
  }

  #foodsSetting(foodsString) {
    const foodsStringArray = foodsString.split(',');

    foodsStringArray.forEach((foodString) => this.#foods.push(new Food(foodString)));
  }

  #businessValidator() {
    const drinkInfoArray = this.#foods.filter((foodInfo) => foodInfo.type() === 'drink');

    if (this.#foods.length === drinkInfoArray.length) {
      throw new CustomError(ERROR_MENU.basic);
    }

    if (this.totalFoodsQuantity() > 20) {
      throw new CustomError(ERROR_MENU.basic);
    }

    if (this.#foodsDuplicate()) {
      throw new CustomError(ERROR_MENU.basic);
    }
  }

  #foodsDuplicate() {
    const foodsNameArray = this.#foods.map((foodInfo) => foodInfo.name());
    const set = new Set(foodsNameArray);
    
    if (foodsNameArray.length !== set.size) {
      return true;
    }

    if (foodsNameArray.length === set.size) {
      return false
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
