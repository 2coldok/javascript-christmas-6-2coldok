import { ERROR_DATE, ERROR_MENU } from "../constants/ErrorMesseage.js";
import { MENU, KNIFE } from "../constants/FoodStorage.js";

export const dateValidator = (date) => {
  if (
    date.includes(' ') ||
    date.includes('.') ||
    Number.isNaN(Number(date)) ||
    !Number.isInteger(Number(date)) ||
    Number(date) < ERROR_DATE.minDate ||
    Number(date) > ERROR_DATE.maxDate
  ) {
    throw new Error(ERROR_DATE.basic);
  }
};

export const nonFoodInMenu = (foodName) => {
  const foodType = MENU
    .filter((type) => Object.hasOwn(type, foodName));

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

export const foodValidator = (foodInfo) => {
  if (
    foodInfo.length !== 2 ||
    foodInfo[KNIFE.quantityPosition].includes('.') ||
    foodInfo[KNIFE.quantityPosition].includes(' ') ||
    Number.isNaN(Number(foodInfo[KNIFE.quantityPosition])) ||
    !Number.isInteger(Number(foodInfo[KNIFE.quantityPosition])) ||
    nonFoodInMenu(foodInfo[KNIFE.namePosition]) ||
    nonFoodQuantity(Number(foodInfo[KNIFE.quantityPosition]))
  ) {
    throw new Error(ERROR_MENU.basic);
  }
};
