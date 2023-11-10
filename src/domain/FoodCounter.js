import Food from "./Food.js";

// 
class FoodCounter {
  #foods = [];

  constructor(foodsString) {
    this.#foodsSetting(foodsString);
  }

  #foodsSetting(foodsString) {
    const foodsStringArray = foodsString.split(',');
    foodsStringArray.forEach((foodString) => this.#foods.push(new Food(foodString)));
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
