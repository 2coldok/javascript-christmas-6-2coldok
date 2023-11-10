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
const a = new FoodCounter('타파스-1,제로콜라-1,아이스크림-13');
console.log(a.foodsListWithQuantity());*/