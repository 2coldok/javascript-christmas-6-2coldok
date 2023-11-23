import { foodValidator } from "../util/Validator.js";
import { 
  MENU,
  NAME,
  KNIFE
} from "../constants/FoodStorage.js";

class Food {
  #name;

  #quantity;

  constructor(food) {
    foodValidator(this.#enrollFood(food));
  }
   
  #enrollFood(food) {
    const foodInfoArray = food.split(KNIFE.bladePosition); 
    this.#name = foodInfoArray[KNIFE.namePosition];
    this.#quantity = Number(foodInfoArray[KNIFE.quantityPosition]);

    return foodInfoArray;
  }

  #category() {
    const [foodTypeInfo] = MENU
      .filter((foodType) => Object.hasOwn(foodType, this.#name));
  
    return foodTypeInfo;
  }

  type() {
    return this.#category()[NAME.type];
  }

  name() {
    return this.#name;
  }
  
  quantity() {
    return this.#quantity;
  }

  totalPrice() {
    return this.#category()[this.#name] * this.quantity();
  }
}

export default Food;
