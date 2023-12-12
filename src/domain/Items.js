
class Items {
  #name;
  #price;
  #amount;
  
  constructor(item) {
    this.#setItems(item);
  }
  
  // input : '[콜라,1500,20]'
  #setItems(item) {
    const itemData = item.replace(/[[\]]/g, '');
    const [name, price, amount] = itemData.split(',');
    
    this.#name = name;
    this.#price = price;
    this.#amount = amount;
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return Number(this.#price);
  }

  getAmount() {
    return Number(this.#amount);
  }
}

export default Items;

/*
const item = new Items('[콜라,1500,20]');

console.log(item.getName(), item.getPrice(), item.getAmount());
*/