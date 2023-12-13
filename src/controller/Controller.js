import PairMatching from "../domain/PairMatching.js";
import BoardForm from "../domain/BoardForm.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  
  constructor() {
    


  }

  async getChoice() {
    try {


    } catch (error) {

    }
  }

  async getForm() {
    try {

    } catch (error) {

    }
  }

  async pairMatching() {
    OutputView.printTemplete();
    const form = await this.getForm();
    const boardForm = new BoardForm(form);
    const pairMatching = new PairMatching()

  }

}

export default Controller;