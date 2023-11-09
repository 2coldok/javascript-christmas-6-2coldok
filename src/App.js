class App {
  async run() {}
}

export default App;



function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2023, 10, 9);

console.log(getWeekDay(date));

