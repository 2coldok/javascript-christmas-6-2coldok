import BridgeGame from "../domain/BridgeGame.js";
import BridgeMaker from "../BridgeMaker.js";
import BridgeRandomNumberGenerator from "../BridgeRandomNumberGenerator.js";
import InputVieww from "../view/InputVieww.js";
import OutputVieww from "../view/OutputVieww.js";

import { lengthValidator } from "../utils/Validator.js";

class BridgeController {
  bridgeGame;
    
  constructor() {

  }

  async setting() {
    OutputVieww.printProlog();
    
    this.length = await this.getBridgeLength();
    OutputVieww.printBlank();
    const answerKey  = BridgeMaker.makeBridge(this.length, BridgeRandomNumberGenerator.generate);
    this.bridgeGame = new BridgeGame(answerKey);
    await this.play();
  }


  async play() {
    try {
      const space = await this.getSpace();
      OutputVieww.printMap(this.bridgeGame.move(space));
      OutputVieww.printBlank();
  
      if (this.bridgeGame.isGameOver()) {
        throw 1;
      }
      if (this.bridgeGame.getStatus()) {
        this.showResult();
      }
      if (!this.bridgeGame.isGameOver() && !this.bridgeGame.getStatus()) {
        await this.play();
      }

    } catch(e) {
      const a = await this.getCommand();
      await this.commandHelm(a);
    }
  }

  showResult() {
    OutputVieww.printResult(this.bridgeGame.finalPosition());
    OutputVieww.printFinalStatus(this.bridgeGame.getStatus(), this.bridgeGame.getCycle());
  }


  async getBridgeLength() {
    try {
      const length = await InputVieww.readBridgeSize();
      lengthValidator(length);
      return Number(length);
    } catch (error) {
      OutputVieww.printErrorMesseage(error);
      await this.getBridgeLength();
    }
  }
  
  async getSpace() {
    try {
      return await InputVieww.readMoving();

    } catch (error) {
      OutputVieww.printErrorMesseage(error);
      await this.getSpace();
    }
  }

  async getCommand() {
    try {
      return await InputVieww.readGameCommand();
      
      
    } catch (e) {
     
    }
  }


  async commandHelm(command) {
    if (command === 'R') {
      this.bridgeGame.retry();
      await this.play();
    }
    if (command === 'Q') {
      this.showResult();
    }
    if (command !== 'R' && command !== 'Q') {
      throw new Error('[ERROR] 커멘드 오류');
    }
  }

  async screeningError(asyncFunc) {
    try {
      return await asyncFunc();
    } catch (error) {
      OutputVieww.printErrorMesseage(error);
      return await this.screeningError(asyncFunc); //여기 await 안붙여도 되나..?
    }
  }

}

export default BridgeController;

const a = new BridgeController();
a.setting();