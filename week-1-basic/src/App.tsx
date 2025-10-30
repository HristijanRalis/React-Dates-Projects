import "./App.css";
import { AgeCalculator } from "./components/AgeCalculator/AgeCalculator";
import "bootstrap/dist/css/bootstrap.min.css";
import { CurrentClock } from "./components/CurrentClock/CurrentClock";
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
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div>
    </div>
  );
}

export default App;
