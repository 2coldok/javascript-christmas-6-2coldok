import EventPlanner from "./controller/EventPlanner.js";

class App {
  async run() {
    const eventPlanner = new EventPlanner();
    
    await eventPlanner.start();
  }
}

export default App;
