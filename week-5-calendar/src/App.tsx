import "./App.css";
import { SimpleCalendar } from "./components/SimpleCalendar/SimpleCalendar";

function App() {
  return (
    <div className="App">
      {/* Simple Calendar */}
      <div className="section">
        <h1>Simple Calendar </h1>
        <SimpleCalendar />
      </div>

      {/* Habit Tracker */}
      <div className="section">
        <h1>Habit Tracker</h1>
      </div>

      {/* Work Hours Calculator*/}
      <div className="section">
        <h1> Work Hours Calculator</h1>
      </div>

      {/* React Calendar Integration */}
      <div className="section">
        <h1>React Calendar Integration</h1>
      </div>

      {/*Calendar with Events */}
      <div className="section">
        <h1>Calendar with Events</h1>
      </div>
    </div>
  );
}

export default App;
