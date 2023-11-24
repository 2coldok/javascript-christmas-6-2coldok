class App {
  async run() {}
}

export default App;


/*
class ChristmasController {
  #planner;

  constructor() {
    this.#planner = new Planner();
  }

  async play() {
    await this.#setPlan();
    this.#showBeforeDiscount();
    this.#showAfterDiscount();
  }

  async #setPlan() {
    await this.#retryInput(async () => {
      const visitDate = await InputView.readVisitDate();
      this.#planner.setVisitDate(visitDate);
    });

    await this.#retryInput(async () => {
      const order = await InputView.readOrder();
      this.#planner.setOrder(order);
    });
  }

  #showBeforeDiscount() {
    OutputView.printPreviewTitle(this.#planner.getVisitDate());
    OutputView.printOrder(this.#planner.getOrder());
    OutputView.printPriceBeforeDiscount(this.#planner.getPrice());
  }

  #showAfterDiscount() {
    const [discount, discountTotal] = this.#planner.caculateDiscount();

    OutputView.printGift(discount?.gift);
    OutputView.printDiscountInfo(discount);
    OutputView.printTotalDiscount(discountTotal);
    OutputView.printPriceAfterDiscount(this.#planner.getPrice());
    OutputView.printBadge(this.#planner.getBadge(discountTotal));
  }

  async #retryInput(func) {
    try {
      return await func();
    } catch (error) {
      OutputView.printError(error.message);
      return this.#retryInput(func);
    }
  }
}
*/
