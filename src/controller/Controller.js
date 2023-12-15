import MatchBoard from "../domain/MatchBoard.js";
import PairMatching from "../domain/PairMatching.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  #matchBoard;
  
  constructor() {
    this.#matchBoard = new MatchBoard();
  }

  async start() {
    await this.getChoice();
  }

  async getChoice() {
    try {
      const choice = await InputView.readChoice();
      if (choice === '1') return await this.pairMatching();
      if (choice === '2') return //


    } catch (error) {

    }
  }

  async getForm() {
    try {
      const form = await InputView.readForm();
      return form;
    } catch (error) {

    }
  }

  async getRematchingChoice() {
    try {
      const choice = await InputView.readRematchingChoice();
      return choice;

    } catch (error) {

    }
  }

  async pairMatching() {
    OutputView.printTemplete();
    const form = await this.getForm();
    const [course, level, mission] = form;
    const pairMatching = new PairMatching(course);
    const pairResult = [];
    while (pairResult.length < 1) {
      const pairs = pairMatching.getPairResult();
      if (!this.#matchBoard.checkSameLevelPairs(form, pairs)) {
        pairResult.push(pairs);
      }
    }
    const [k] = pairResult 
    OutputView.printPairMatchingResult(k);
    const status = this.#matchBoard.record(form, k);
    if (status === 'reject') return await this.getRematchingChoice();
    
    

    return await this.getChoice();
  }

}

export default Controller;

const a = new Controller();
a.start();

//node src/controller/Controller