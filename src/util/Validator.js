import CustomError from "../error/CustomError.js";
import { REGEX_ERROR, ERROR_DATE, ERROR_MENU } from "../constants/ErrorMesseage.js";
import { MENU } from "../constants/FoodStorage.js";

export const dateValidator = (date) => {
  if (
    Number.isNaN(date) ||
    date < ERROR_DATE.minDate ||
    date > ERROR_DATE.maxDate
  ) {
    throw new CustomError(ERROR_DATE.basic);
  }
}

// foodInfoArray : [초코케이크-3]
export const foodValidator = (foodInfoArray) => {
  const foodName = foodInfoArray[0];
  const foodQuantity = Number(foodInfoArray[1]);

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
