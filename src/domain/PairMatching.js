import { Random} from "@woowacourse/mission-utils";
import { FRONT_CREWS, BACKEND_CREWS } from "../constants/Storage.js";

class PairMatching {
  #crews;
  
  // course : '프론트엔드'
  constructor(course) {
    this.#setCourse(course);

  }

  #setCourse(course) {
    if (course === '프론트엔드') this.#crews = FRONT_CREWS;
    if (course === '백엔드') this.#crews = BACKEND_CREWS;
  }

  getPairs() {
    //짝수
    if (this.#crews.length % 2 === 0) {
      this.#shuffling();
      return this.#makeEvenPairs();
    } 
    
    // 홀수
    if (this.#crews.length % 2 !== 0) {
      this.#shuffling();
      return this.#makeOddPairs();
    }
    
  }

  #shuffling() {
    const indexArray = this.#crews.map((crew, index) => index);
    
    const shuffledIndexArray = Random.shuffle(indexArray);
    
    this.#crews = shuffledIndexArray.map((element) => this.#crews[element]);
  }

  #makeEvenPairs() {
    
    const pairs = [];
    for (let i = 0; i < this.#crews.length - 1; i += 2) {
      pairs.push(this.#crews.slice(i, i + 2));
    }
    return pairs;

  }

  #makeOddPairs() {
    const last = this.#crews.at(-1);
    const copy = this.#makeEvenPairs().slice();
    copy.with(copy.length - 1, copy.at(-1).push(last));
    
    return copy;
  }
}

export default PairMatching;
/* 사용법
const a = new PairMatching('백엔드');
const k = a.getPairs();
console.log(k);
*/
