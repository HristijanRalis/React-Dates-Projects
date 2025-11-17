import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BirthdayRemainder } from "./components/BirthdayRemainder/BirthdayRemainder";
import { MultiEventCountdown } from "./components/MultiEventCountdown/MultiEventCountdown";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Birthday Remainder */}
      <div className="sections">
        <h1>Birthday Remainder</h1>
        <BirthdayRemainder />
      </div>
      {/* Multi-Event Countdown */}

      <div className="sections">
        <h1>Multi-Event Countdown</h1>
        <MultiEventCountdown />
      </div>
      {/* Daily Planner */}

      <div className="sections">
        <h1>Daily Planner</h1>
      </div>
      {/* QuoteOfTheDay */}

      <div className="sections">
        <h1>QuoteOfTheDay</h1>
      </div>
      {/* TaskDeadlineTracker */}

      <div className="sections">
        <h1> TaskDeadlineTracker </h1>
      </div>
    </div>
  );
}

export default App;
