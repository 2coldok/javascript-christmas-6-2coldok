import Food from "./Food.js";
import Event from "./Event.js";

class Order {
  #foods;
  #event;

  #benefit
  
  // 원본
  setDate(date) {
    this.#event = new Event(date);
  }

  setOrder(order) {
    this.#foods = [];
    order.split(',').forEach((element) => this.#foods.push(new Food(element)));
    this.#onlyDrinkValidator();
    this.#dupleOrderValidator();
    this.#amountValidator();
    this.#setBenefit();
  }

  #onlyDrinkValidator() {
    const typeArray = this.#foods.map((element) => element.getType());
    if (new Set(typeArray).size === 1 && typeArray.includes('drink')) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(음료만 주문 불가능)');
    }
  }

  #dupleOrderValidator() {
    const foodNameArray = this.#foods.map((element) => element.getName());
    if (foodNameArray.length !== new Set(foodNameArray).size) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(중복 메뉴 불가능)');
    }
  }

  #amountValidator() {
    const totalFoodAmount = this.#foods.reduce((acc, cur) => acc + cur.getAmount(), 0);
    if (totalFoodAmount > 20) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(최대 주문 20개)');
    }

    this.#foods.forEach((element) => {
      if (element.getAmount() === 0) {
        throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.(수량이 0인 음식이 있음)');
      }
    })
  }

  #setBenefit() {
    const map = new Map();
    map.set('크리스마스 디데이 할인', this.#event.christmasDDdayDiscount());
    map.set('평일 할인', this.#event.weekdayDiscount(Food.getTotalTypeAmount(this.#foods, 'desert')));
    map.set('주말 할인', this.#event.weekendDiscount(Food.getTotalTypeAmount(this.#foods, 'main')));
    map.set('특별 할인', this.#event.specialDiscount());
    map.set('증정 이벤트', this.#event.freebieDiscount(this.getTotalOrderPrice()));
    
    this.#benefit = map;
  }

  #deleteNonBenefit(map) {
    const copyArray = Array.from(map).slice();
    const copyMap = new Map(copyArray);

    Array.from(copyMap).forEach((element) => {
      const [eventName, discount] = element;
      if (discount === 0) {
        copyMap.delete(eventName);
      }
    });
    return copyMap;
  }
  
  // return [ [ '타파스', 1 ], [ '제로콜라', 1 ], [ '크리스마스파스타', 4 ] ]
  getOrderMenu() {
    return this.#foods.map((element) => {
      const [name, amount] = [element.getName(), element.getAmount()];
      return [name, amount];
    });
  }

  getTotalOrderPrice() {
    return this.#foods.reduce((acc, cur) => acc + cur.getPrice(), 0);
  }

  getFreebieMenu() {
    const price = this.#event.freebieDiscount(this.getTotalOrderPrice());
    
    if (price === 0) return '없음';
    if (price === 25000) return '샴페인 1개';
  }
  
  /*
  [
  [ '크리스마스 디데이 할인', 1200 ],
  [ '평일 할인', 4046 ],
  [ '특별 할인', 1000 ],
  [ '증정 이벤트', 25000 ]
]
  */
  getBenefitList() {
    const benefit = this.#deleteNonBenefit(this.#benefit);
    if (!this.#event.eventCondition(this.getTotalOrderPrice()) || benefit.size === 0) {
      return ['없음'];
    }
    return Array.from(benefit);
  }

  getPureDiscount() {
    if (!this.#event.eventCondition(this.getTotalOrderPrice())) {
      return 0;
    }
    return Array.from(this.#benefit).reduce((acc, cur) => {
      const [eventName, discount] = cur;
      if (eventName !== '증정 이벤트') {
        return acc + discount;
      } else {
        return acc + 0;
      }
    }, 0)
  }
  
  // 증정 이벤트 가격 포함
  getTotalBenefitDiscount() {
    if (!this.#event.eventCondition(this.getTotalOrderPrice())) {
      return 0;
    }
    return Array.from(this.#benefit).reduce((acc, cur) => {
      const [eventName, discount] = cur;
      return acc + discount; 
    }, 0);
  }

  getPaymentPrice() {
    return this.getTotalOrderPrice() - this.getPureDiscount();
  }

  getBadge() {
    return this.#event.decemberBadge(this.getTotalBenefitDiscount());
  }
}

export default Order;
/*
const order = new Order();
order.setDate('25');
order.setOrder('아이스크림-3,콜라-1');

console.log(order.getOrderMenu());
console.log(order.getTotalOrderPrice());
console.log(order.getFreebieMenu());
console.log(order.getBenefitList());
console.log(order.getTotalBenefitDiscount());
console.log(order.getPaymentPrice());
console.log(order.getBadge());
*/
/*
[ [ '아이스크림', 2 ] ]
10000
없음
[ [ '크리스마스 디데이 할인', 3400 ], [ '평일 할인', 4046 ], [ '특별 할인', 1000 ] ]
8446
1554
별
*/





/*
const map = new Map();

map.set('슈샤이어', ['워로드', '디스트로이어']);
map.set('서포터', ['바드', '홀리나이트']);

const map2 = Object.assign({}, Object.fromEntries(map));
map.delete('슈샤이어');

console.log(map);
console.log(new Map(Object.entries(map2)));*/