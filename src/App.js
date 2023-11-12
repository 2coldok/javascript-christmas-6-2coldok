import EventPlanner from "./controller/EventPlanner.js";

class App {
  async run() {
    await new EventPlanner().start();
  }
}

export default App;
