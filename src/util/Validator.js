import CustomError from "../error/CustomError.js";
import { ERROR_DATE, ERROR_MENU } from "../constants/ErrorMesseage.js";
import { MENU, KNIFE } from "../constants/FoodStorage.js";

export const dateValidator = (date) => {
  if (
    typeof date !== 'number' ||
    Number.isNaN(date) ||
    date < ERROR_DATE.minDate ||
    date > ERROR_DATE.maxDate
  ) {
    throw new CustomError(ERROR_DATE.basic);
  }
}

export const foodValidator = (foodInfoArray) => {
  const foodName = foodInfoArray[KNIFE.namePosition];
  const foodQuantity = Number(foodInfoArray[KNIFE.quantityPosition]);

  if (
    foodInfoArray.length !== 2 ||
    nonFoodInMenu(foodName) ||
    Number.isNaN(foodQuantity) ||
    nonFoodQuantity(foodQuantity)
  ) {
    throw new CustomError(ERROR_MENU.basic);
  }
}

export const nonFoodInMenu = (foodName) => {
  const foodType = MENU
    .filter((foodType) => foodType.hasOwnProperty(foodName));

  if (foodType.length === 0) {
    return true;
  }
}

export const nonFoodQuantity = (foodQuantity) => {
  if (foodQuantity === 0) {
    return true;
  }
}
