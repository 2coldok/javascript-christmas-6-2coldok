import CustomError from "../error/CustomError.js";
import { REGEX_ERROR, ERROR_DATE, ERROR_MENU } from "../constants/ErrorMesseage.js";
import { REGEX } from "../constants/FoodStorage.js";

export const dateValidator = (date) => {
  if (
    Number.isNaN(date) ||
    date < ERROR_DATE.minDate ||
    date > ERROR_DATE.maxDate
  ) {
    throw new CustomError(ERROR_DATE.basic);
  }
}


//Food 에 이식
export const unitFoodValidator = (unitFood) => {
  const pieceArray = unitFood.split('-');
  const firstPiece = pieceArray[0];
  const endPiece = pieceArray[1];

  if (
    pieceArray.length !== 2 ||
    REGEX.notHangle.test(firstPiece) ||
    REGEX.notNumber.test(endPiece)
  ) {
    throw new CustomError(ERROR_MENU.basic);
  }
}

// FoodCounter에 이식
export const entireFoodsValidator = (entireFoods) => {
  if (REGEX_ERROR.menu.test(entireFoods)) {
    throw new CustomError(ERROR_MENU.basic);
  }
}

