import Board from "../domain/Board.js";
import PairMatching from "../domain/PairMatching.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import { matchingForm } from "../utils/Formatter.js";
import { choiceValidator, dataValidator, YesOrNoValidator } from "../utils/Validator.js";

class Controller {
  #board;
  #remathcingCount = 0;

  constructor() {
    this.#board = new Board();
  }

  async boot() {
    try {
      while (true) {
        const choice = await this.getChoice();
        choiceValidator(choice);
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

    } catch (error) {
      OutputView.printError(error);
      return await this.boot();
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
      return await this.startMatching(data);
    }
    
  }

  async startMatching(data) {
    try {
      const pairMatching = new PairMatching(matchingForm(data));
      const pairs = pairMatching.getPairs();
      if (this.#remathcingCount > 3) throw new Error('[ERROR] 3회 이상 매칭 실패');
      if (this.#board.searchSameLevelPairAlready(data, pairs)) {
        this.#remathcingCount += 1;
        return this.startMatching(data);
      }
      // 레벨 페어 중복 확인 (to do)
      // 3회 초과 카운트 (to do)
      this.#board.record(data, pairs);
      OutputView.printPairs(this.#board.getPairs(data));
      this.#remathcingCount = 0;

    } catch (error) {
      OutputView.printError(data);
      return await this.pairMatching();
    }
  }

  async pairSearching() {
    try {
      const data = await this.getData();
      if (!this.#board.searchHasDataInBoard(data)) throw new Error('[ERROR] 매칭 이력이 없습니다.');
      OutputView.printPairs(this.#board.getPairs(data));
    } catch (error) {
      OutputView.printError(error);
      return await this.pairSearching();
    }
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
