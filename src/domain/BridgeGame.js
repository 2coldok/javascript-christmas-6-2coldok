import Bridge from "./Bridge.js";

class BridgeGame {
  #bridge

  #answerKey;

  constructor(answerKey) {
    this.#answerKey = answerKey;
    this.#bridge = Bridge;
    this.#bridge.updateAnswerKey(answerKey);
  }
  
  move(choiceNumber) {
    this.#bridge.updateTrace(choiceNumber);
    
    return this.#bridge.getTrace();
  }

  finalPosition() {
    return this.#bridge.getTrace();
  }

  isGameOver() {
    return this.#bridge.isGameOver();
  }

  getCycle() {
    return this.#bridge.cycle;
  }
  
  getStatus() {
    return this.#bridge.checkSuccess();
  }

  retry() {
    this.#bridge.playTime = 0;
    this.#bridge.cycle += 1;
    this.#bridge.answerKey = this.#answerKey;
    this.#bridge.upTrace = [];
    this.#bridge.downTrace = [];
  }
}

export default BridgeGame;
/*
const a = new BridgeGame([1,0,0]);

a.move(1);
a.move(0);
a.move(1);
console.log(a.getCycle());
a.retry();

a.move(1);
a.move(0);
console.log(a.move(0));
console.log(a.getCycle()); */
