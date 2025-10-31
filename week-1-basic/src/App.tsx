import "./App.css";
import { AgeCalculator } from "./components/AgeCalculator/AgeCalculator";
import "bootstrap/dist/css/bootstrap.min.css";
import { CurrentClock } from "./components/CurrentClock/CurrentClock";
import { GreetingByTimeOfDay } from "./components/GreetingByTimeOfDay/GreetingByTimeOfDay";
import { DaysUntilEvent } from "./components/DaysUntilEvent/DaysUntilEvent";
import "react-datepicker/dist/react-datepicker.css";
import { WeekDayFinder } from "./components/WeekDayFinder/WeekDayFinder";
function App() {
  return (
    <div className="App">
      {/* Age Calculator */}
      <div className="section">
        <h1>Age Calculator</h1>
        <AgeCalculator />
      </div>

      {/* Current Clock*/}
      <div className="section">
        <h1>Current Clock</h1>

        <CurrentClock />
      </div>

      {/* Greeting By Time Of Day */}
      <div className="section">
        <h1>Greeting</h1>
        <GreetingByTimeOfDay />
      </div>

      {/* Days Until Events */}

      <div className="section">
        <h1>Days Until Event</h1>
        <DaysUntilEvent />
      </div>

      {/* Weekday Finder */}

      <div className="section">
        <h1>Weekday Finder</h1>
        <WeekDayFinder />
      </div>
    </div>
  );
}

export default App;
