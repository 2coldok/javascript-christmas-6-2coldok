import PlannerController from "./controller/PlannerController.js";

class App {
  async run() {
    const plannerController = new PlannerController();
    await plannerController.boot();
  }
}

export default App;
