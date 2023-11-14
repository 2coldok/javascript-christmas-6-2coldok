import { ERROR_DATE, ERROR_MENU } from "../constants/ErrorMesseage.js";
import { MENU, KNIFE } from "../constants/FoodStorage.js";

export const dateValidator = (date) => {
  if (
    Number.isNaN(date) ||
    !Number.isInteger(date) ||
    date < ERROR_DATE.minDate ||
    date > ERROR_DATE.maxDate
  ) {
    throw new Error(ERROR_DATE.basic);
  }
};

export const nonFoodInMenu = (foodName) => {
  const foodType = MENU
    .filter((foodType) => Object.hasOwn(foodType, foodName));

  if (foodType.length === 0) {
    return true;
  }
  return false;
};

export const nonFoodQuantity = (foodQuantity) => {
  if (foodQuantity < ERROR_MENU.minOrderNumber) {
    return true;
  }
  return false;
};

export const foodValidator = (foodInfoArray) => {
  const foodName = foodInfoArray[KNIFE.namePosition];
  const foodQuantity = Number(foodInfoArray[KNIFE.quantityPosition]);

  if (
    foodInfoArray.length !== 2 ||
    nonFoodInMenu(foodName) ||
    Number.isNaN(foodQuantity) ||
    !Number.isInteger(foodQuantity) ||
    nonFoodQuantity(foodQuantity)
  ) {
    throw new Error(ERROR_MENU.basic);
  }
};
