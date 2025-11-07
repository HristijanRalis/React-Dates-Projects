import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Stopwatch } from "./components/Stopwatch/Stopwatch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Stopwatch */}
      <div className="section">
        <Stopwatch />
      </div>

      {/* Pomodoro Timer */}
      <div className="section"></div>

      {/* Event Countdown */}
      <div className="section"></div>

      {/* World Clock */}
      <div className="section"></div>

      {/* Session Timer */}
      <div className="section"></div>
    </div>
  );
}

export default App;
