
const Bridge = {
  playTime : 0,
  cycle : 1,
  answerKey : [],
  upTrace : [],
  downTrace : [],

  updateAnswerKey(array) {this.answerKey = [...array]},

  isGameOver() {
    if (this.upTrace.includes('X') || this.downTrace.includes('X')) {
      return true;
    } else {
      return false;
    }
  },

  trace(choiceNumber) {
    if (choiceNumber === this.answerKey[this.playTime]) {
      return 'O';
    } else {
      return 'X';
    }
  },

  updateTrace(choiceNumber) {
    if (choiceNumber === 1) {
      this.upTrace.push(this.trace(choiceNumber));
      this.downTrace.push(' ');
    }
    if (choiceNumber === 0) {
      this.upTrace.push(' ');
      this.downTrace.push(this.trace(choiceNumber));
    }
    this.playTime += 1;
  },

  getTrace() {
    return [this.upTrace, this.downTrace];
  },

  checkSuccess() {
    if (!this.isGameOver() && this.playTime === this.answerKey.length) {
      return true;
    } else {
      return false;
    }
  }
};

export default Bridge;
/*
Bridge.updateAnswerKey([1,0,0]);
Bridge.updateTrace(1);
Bridge.updateTrace(1);


console.log(Bridge.playTime);
console.log(Bridge.upTrace);
console.log(Bridge.downTrace);
console.log(Bridge.isGameOver());*/