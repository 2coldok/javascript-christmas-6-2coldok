import Board from "../domain/Board.js";
import PairMatching from "../domain/PairMatching.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  #board;

  constructor() {
    this.#board = new Board();
  }

  async getChoice() {
    try {

    } catch (error) {
      OutputView.printError(error);
      return await this.getChoice();
    }
  }

  async getData() {
    try {

    } catch (error) {
      OutputView.printError(error);
      return await this.getData();
    }
  }

  async getYesOrNo() {
    try {

    } catch (error) {
      OutputView.printError(error);
      return await this.getYesOrNo();
    }
  }

  


}

export default Controller;
