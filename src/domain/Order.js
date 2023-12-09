import Food from "./Food.js";
import Event from "./Event.js";
import { BENEFITS } from "../constants/Benefits.js";
import { dateValidator } from "../utils/Validator.js";
// 레드와인-1,제로콜라-2,타파스-1
/*
2. 주문   
- 음료만 주문시   
- 메뉴 최대 20개   getTotalFoodsAmount
- 메뉴판에 없는 메뉴    
- 메뉴 개수는 1개 이상만 입력되게   
- 메뉴 형식 맞추기   
- 중복메뉴 처리   
*/

class Order {
  #event;
  #foods = [];
  
  #benefits = new Map();

  constructor() {

  }
  //원본 그대로
  setDate(date) {
    dateValidator(date);
    this.#event = new Event(Number(date));
  }
  
  // 원본 그대로
  setFoods(foods) {
    const foodsInfoArray = foods.split(',');
    foodsInfoArray.forEach((foodInfo) => this.#foods.push(new Food(foodInfo)));
    this.#dupleOrderValidator();
    this.#onlyDrinkMaxAmountValidator();
  }

  #totalTypeAmount(type) {
    return this.#foods.filter((food) => food.getType() === type)
      .map((food) => food.getAmount())
      .reduce((acc, cur) => acc + cur, 0);
  }
  
  //14, 제로콜라-1,레드와인-2,샴페인-2,타파스-1
  #dupleOrderValidator() {
    const foodNames = this.#foods.map((food) => food.getName());
    console.log(foodNames);
    if (foodNames.length !== new Set(foodNames).size) {
      this.#foods = [];
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(중복 메뉴)');
    }
  }

  #onlyDrinkMaxAmountValidator() {
    const totalFoodsAmount = this.#foods.reduce((acc, cur) => acc + cur.getAmount(), 0);
    console.log(`음식 총 수량 : ${totalFoodsAmount}`);
    console.log(`음료 개수 : ${this.#totalTypeAmount('drink')}`);
    console.log(`에피타이저 개수 : ${this.#totalTypeAmount('appetizer')}`);
    console.log(`메인 개수 : ${this.#totalTypeAmount('main')}`);
    console.log(`디저트 개수 : ${this.#totalTypeAmount('desert')}`);
    if (totalFoodsAmount > 20) {
      this.#foods = [];
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(주문 개수 20개 이상)');
    }

    if (this.#totalTypeAmount('drink') === totalFoodsAmount) {
      this.#foods = [];
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(음료만 주문)');
    }
  }
  
  // <<<<<<<<작동 버튼>>>>>>>>>
  setBenfits() {
    this.#benefits
    .set('christmas', this.#event.chirstmasDDayDiscount())
    .set('weekday', this.#event.weekdayDiscount(this.#totalTypeAmount('desert')))
    .set('weekend', this.#event.weekendDiscount(this.#totalTypeAmount('main')))
    .set('special', this.#event.specialDiscount())
    .set('freebie', this.#event.freebieDiscount(this.getTotalOrderPrice()))
  }

  getDate() {
    return this.#event.getDate();
  }

  getOrderMenu() {
    return this.#foods.map((food) => `${food.getName()} ${food.getAmount()}개`);
  }

  getTotalOrderPrice() {
    return this.#foods.reduce((acc, cur) => {
      return acc + cur.getPrice();
    }, 0)
  }

  getFreebieMenu() {
    if (this.#event.freebieDiscount(this.getTotalOrderPrice()) !== 0) {
      return '샴페인 1개';
    } else {
      return '없음';
    }
  }
  
  /* [
  '크리스마스 디데이 할인: -1,200원',
  '평일 할인: -4,046원',
  '특별 할인: -1,000원',
  '증정 이벤트: -25,000원'
]*/
  getBenefitList() {
    if (this.getTotalOrderPrice() < 10000) {
      return ['없음'];
    }
    const k = Array.from(this.#benefits).map((benefit) => {
      const [_, price] = benefit;
      return price;
    });
    
    if (new Set(k).size === 1) {
      return ['없음'];
    }

    return Array.from(this.#benefits).filter((benefit) => {
      const [benefitName, price] = benefit;
      return price !== 0;
    }).map((benefit) => {
      const [benefitName, price] = benefit;
      return [BENEFITS[benefitName], price];
    });
  }
  
  // 샴페인 금액 없는 순수 혜택 금액
  getPureBenefitPrice() {
    if (this.getTotalOrderPrice() < 10000) return 0;

    return this.#benefits.get('christmas') +
    this.#benefits.get('weekday') +
    this.#benefits.get('weekend') +
    this.#benefits.get('special');
  }
  
  // 총 혜택 금액
  getTotalBenefitPrice() {
    return this.getPureBenefitPrice() + this.#benefits.get('freebie');
  }
  
  // 할인 후 예상 결제 금액
  getPaymentPrice() {
    return this.getTotalOrderPrice() - this.getPureBenefitPrice();
  }

  getBadge() {
    const totalBenefitPrice = this.getTotalBenefitPrice();
    if (totalBenefitPrice >= 20000) return '산타';
    if (totalBenefitPrice >= 10000) return '트리';
    if (totalBenefitPrice >= 5000) return '별';
    return '없음';
  }
}

export default Order;
/*
const order = new Order();
order.setDate('3');
order.setFoods('티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1');
order.setBenfits();

console.log(order.getOrderMenu());
console.log(order.getTotalOrderPrice());
console.log(order.getFreebieMenu());
console.log(order.getBenefitList());
console.log(order.getTotalBenefitPrice());
console.log(order.getPaymentPrice());
console.log(order.getBadge());
*/

/*
[ '티본스테이크 1개', '바비큐립 1개', '초코케이크 2개', '제로콜라 1개' ]
142000
샴페인 1개
[
  [ '크리스마스 디데이 할인: ', 1200 ],
  [ '평일 할인: ', 4046 ],
  [ '특별 할인: ', 1000 ],
  [ '증정 이벤트: ', 25000 ]
]
31246
135754
산타
*/