// input : '프론트엔드, 레벨1, 자동차경주' (원본 그대로 들어옴);
// output : [ '프론트엔드', '레벨1', '자동차경주' ]
class BoardForm {
  #inputArray;

  constructor(input) {
    this.#inputArray = this.#set(input);
  }
  
  #set(input) {
    return input.split(',').map((element) => element.trim());
  }

  getData() {
    return this.#inputArray;
  }
}

export default BoardForm;
/*
const a = new BoardForm('프론트엔드, 레벨1, 자동차경주');

console.log(a.getData());
*/