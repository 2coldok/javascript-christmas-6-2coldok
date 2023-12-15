import Board from "../domain/Board.js";
import PairMatching from "../domain/PairMatching.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import { matchingForm } from "../utils/Formatter.js";

class Controller {
  #board;

  constructor() {
    this.#board = new Board();
  }

  async boot() {
    while (true) {
      const choice = await this.getChoice();
      if (choice === '1') {
        OutputView.printTemplete();
        await this.pairMatching();
      } 
      if (choice === '2') {
        OutputView.printTemplete();
        await this.pairSearching();
      }
      if (choice === '3') this.resetBoard(); 
      if (choice === 'Q') break;
    }
  }

  async pairMatching() {
    const data = await this.getData();
    
    // 매칭 정보가 있으면
    if (this.#board.searchHasDataInBoard(data)) {
      const choice = await this.getYesOrNo();
      if (choice === '네') return this.startMatching(data);
      if (choice === '아니오') {
        OutputView.printBlank();
        await this.pairMatching();
      }
    } 
    
    // 매칭 정보가 없으면
    if (!this.#board.searchHasDataInBoard(data)) {
      return this.startMatching(data);
    }
    
  }

  startMatching(data) {
    const pairMatching = new PairMatching(matchingForm(data));
    const pairs = pairMatching.getPairs();
    // 레벨 페어 중복 확인 (to do)
    this.#board.record(data, pairs);
    OutputView.printPairs(this.#board.getPairs(data));
  }

  async pairSearching() {
    const data = await this.getData();
    // todo 해당 기록이 없을 경우
    OutputView.printPairs(this.#board.getPairs(data));
  }

  async getChoice() {
    try {
      return await InputView.readChoice();
    } catch (error) {
      OutputView.printError(error);
      return await this.getChoice();
    }
  }

  async getData() {
    try {
      return await InputView.readData();
    } catch (error) {
      OutputView.printError(error);
      return await this.getData();
    }
  }

  async getYesOrNo() {
    try {
      return await InputView.readYesOrNo();
    } catch (error) {
      OutputView.printError(error);
      return await this.getYesOrNo();
    }
  }

  resetBoard() {
    this.#board.reset();
    OutputView.printReset();
  }
}

export default Controller;
