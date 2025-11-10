import { useState } from "react";
import "./App.css";
import { Stopwatch } from "./components/Stopwatch/Stopwatch";
import { PomodoroTimer } from "./components/PomodoroTimer/PomodoroTimer";
import { EventCountdown } from "./components/EventCountdown/EventCountdown";

function App() {
  return (
    <div className="App">
      {/* Stopwatch */}
      <div className="section">
        <h1>Stopwatch</h1>
        <Stopwatch />
      </div>

      {/* Pomodoro Timer */}
      <div className="section">
        <h1>Pomodoro Time</h1>
        <PomodoroTimer />
      </div>

      {/* Event Countdown */}
      <div className="section">
        <h1>Event Countdown</h1>
        <EventCountdown />
      </div>

      {/* World Clock */}
      <div className="section"></div>

      {/* Session Timer */}
      <div className="section"></div>
    </div>
  );
}

export default App;
