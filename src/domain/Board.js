import { boardForm } from "../utils/Formatter.js";

class Board {
  /*
    map(mission, levelPairs)

    const obj = {
    mission : mission,
    levelPairs : [level, pairs],
  };

  */
  #frontendBoard; 
  #backendBoard;

  constructor() {
    this.#frontendBoard = new Map();
    this.#backendBoard = new Map();
  }
  
  // input1 : data ['프론트엔드', '레벨1', '자동차경주']
  // input2 : pairs
  record(data, pairs) {
    const [course, , ] = data;
    const {mission, levelPairs} = boardForm(data, pairs);

    if (course === '프론트엔드') {
      this.#frontendBoard.set(mission, levelPairs)
    }
    if (course === '백엔드') {
      this.#backendBoard.set(mission, levelPairs);
    }
  }


  getMap() {
    return this.#frontendBoard;
  }



}

export default Board;

const a = new Board();
a.record(['프론트엔드', '레벨1', '자동차경주'], [['a', 'b'], ['c', 'd']]);
a.record(['프론트엔드', '레벨1', '로또'], [[1,2], [3,4]]);
a.record(['프론트엔드', '레벨1', '자동차경주'], [1,2])
console.log(a.getMap());

