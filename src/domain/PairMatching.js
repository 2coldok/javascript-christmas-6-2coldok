import { Random } from "@woowacourse/mission-utils";
import { 
  FRONTEND_CREWS,
  FRONTEND_CREWS_INDEX,
  BACKEND_CREWS,
  BACKEND_CREWS_INDEX
} from "../constants/Constants.js";

class PairMatching {
  #course;
  #crews;
  #indexArray;

  constructor(course) {
    this.#setCourse(course);
  }

  #setCourse(course) {
    if (course === '백엔드') this.#setBackend();
    if (course === '프론트엔드') this.#setFrontEnd();
  }

  #setBackend() {
    this.#course = '백엔드';
    this.#crews = BACKEND_CREWS;
    this.#indexArray = BACKEND_CREWS_INDEX
  }

  #setFrontEnd() {
    this.#course = '프론트엔드';
    this.#crews = FRONTEND_CREWS;
    this.#indexArray = FRONTEND_CREWS_INDEX;
  }

  getshufflingCrews() {
    const indexArray = Random.shuffle(this.#indexArray);
    return this.#crews.split(' ').map((name, index, array) => array[indexArray[index]]);
  }
  
  //이것만 쓰면 됨.
  getPairResult() {
    if (this.#course === '프론트엔드') return this.getOddPairsResult();
    if (this.#course === '백엔드') return this.getEvenPairsResult();
  }

  getEvenPairsResult() {
    const shufflingCrews = this.getshufflingCrews();
    const result = [];
    for (let i = 0; i < shufflingCrews.length - 1; i += 2) {
      result.push(shufflingCrews.slice(i, i + 2));
    }
    return result;
  }

  getOddPairsResult() {
    const shufflingCrews = this.getshufflingCrews();
    /*const shufflingCrews = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];*/
    const result = [];
    for (let i = 0; i < shufflingCrews.length - 1; i += 2) {
      result.push(shufflingCrews.slice(i, i + 2));
    }
    result.at(-1).push(shufflingCrews.at(-1));

    return result;
  }
}

export default PairMatching;

/*
const a = new PairMatching('backend');

console.log(a.getPairResult());
*/


console.log(Random.shuffle([1,2,3,4,5]));
console.log(Random.shuffle([0,1,2,3,4]));