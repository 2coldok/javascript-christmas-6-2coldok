import { boardForm } from "../utils/Formatter.js";
/* 사용법
1. searchHasDataInBoard(data) 로 매칭 기록이 잇는지 확인 true 면 매칭 기록 잇는거임 
매칭 저장전, 조회전 외부에서 이용하기

2. 같은 레벨에 같은 페어 잇는지 확인 
3. record(data, pairs) 랜덤 pair 저장
4. getPairs(data) 페어 조회
5. reset() 초기화
*/

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

  #courseBoard(course) {
    if (course === '프론트엔드') return this.#frontendBoard;
    if (course === '백엔드') return this.#backendBoard;
  }
  
  // input1 : data ['프론트엔드', '레벨1', '자동차경주']
  // input2 : pairs
  record(data, pairs) {

    const [course, , ] = data;
    const {mission, levelPairs} = boardForm(data, pairs);

    this.#courseBoard(course).set(mission, levelPairs)
  }
  // 이미 매칭 기록이 있는지 확인. course, mission 으로 판단
  // 있으면 true
  // 없으면 false 
  searchHasDataInBoard(data) {
    const [course, _, mission] = data;
    
    if (this.#courseBoard(course).has(mission)) return true
    
    return false;
  }
  
  // 페어 조회
  // input : data ['프론트엔드', '레벨1', '자동차경주']
  // output : pairs
  getPairs(data) {
    const [course, level, mission] = data;
    const [_, pairs] = this.#courseBoard(course).get(mission);

    return pairs;
  }

  reset() {
    this.#frontendBoard.clear();
    this.#backendBoard.clear();
  }


  getMap() {
    return this.#frontendBoard;
  }



}

export default Board;
/*
const a = new Board();
a.record(['프론트엔드', '레벨1', '자동차경주'], [['a', 'b'], ['c', 'd']]);
a.record(['프론트엔드', '레벨1', '로또'], [[1,2], [3,4]]);
a.record(['프론트엔드', '레벨1', '숫자 야구'], [1,2])
a.reset();
console.log(a.getMap())
*/
