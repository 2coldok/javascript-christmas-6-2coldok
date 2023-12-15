/*

map.set(숫자, obj) 순회하기 쉽게

obj = {
  data : ['프론트엔드', '레벨1', '로또'];
  pairs : [['a', 'b'], ['c', 'd'] ....];
};

*/

class MatchBoard {
  #board;
  #recordCount = 0
  
  constructor() {
    this.#board = new Map();
  }
  // data : ['frontend', '레벨1', '자동차경주']
  // pairs : [['a', 'b'], []..]
  // 이미 매칭된 것이면 'reject'를 반환한다.
  record(data, pairs) {
    if (this.searchAlreadyMatch(data)) {
      return 'reject';
    }
    const obj = {
      data : data,
      pairs : pairs,
    };
    this.#board.set(this.#recordCount, obj);
    this.#recordCount += 1;
  }
  
  // input : ['frontend', '레벨1', '자동차경주']
  searchAlreadyMatch(inputData) {
    for (let i = 0; i < this.#board.size; i++) {
      const {data, pairs} = this.#board.get(i);
      if (String(data) === String(inputData)) {
        return true;
      }
    }
    return false;   
  }
  
  // 같은 페어가 배열에 포함되어 있으면 true 반환
  #findSamePairs(array1, array2) {
    const copy1 = array1.slice().map((pair) => pair.sort().toString());
    const copy2 = array2.slice().map((pair) => pair.sort().toString());

    const count = copy1.filter((pair) => copy2.includes(pair));
    if  (count.length !== 0) {
      return true;
    }
    return false;
  }

  checkSameLevelPairs(inputData, inputPairs) {
    for (let i = 0; i < this.#board.size; i++) {
      const [a, inputLevel, b] = inputData;
      const {data, pairs} = this.#board.get(i);
      const [course, level, mission] = data;
      if (inputLevel === level && this.#findSamePairs(inputPairs, pairs)) {
        return true;
      } 
    }
    return false;  
  }

  getMap() {
    return this.#board;
  }
}

export default MatchBoard;
/*
const matchBoard = new MatchBoard();

matchBoard.record(['프론트엔드', '레벨1', '자동차경주'], [[1, 2], [3, 4]]);
matchBoard.record(['프론트엔드', '레벨2', '로또'], [[11,12], [13,14]]);
matchBoard.record(['프론트엔드', '레벨1', '숫자야구'], [[2, 1], [33, 44]]);

console.log(matchBoard.getMap());
const k = matchBoard.searchAlreadyMatch(['프론트엔드', '레벨2', '로또']);
const m = matchBoard.checkSameLevelPairs(['프론트엔드', '레벨2', '크리스마스'], [[12, 11], [44, 55]]);

console.log(`이미 매칭된 데이터가 있는가 : ${k}`);
console.log(`같은 레벨에 이미 맺어졌던 페어가 있는가 ${m}`);
*/