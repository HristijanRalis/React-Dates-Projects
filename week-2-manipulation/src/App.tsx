import "./App.css";
import AddSubtractDays from "./components/AddSubtractDays/AddSubtractDays";
import { DateFormater } from "./components/DateFormater/DateFormater";
import NewYearCountdown from "./components/NewYearCountdown/NewYearCountdown";
import { SimpleDateRangeViewer } from "./components/SimpleDateRangeViewer/SimpleDateRangeViewer";
import { TimeDifferenceCalculator } from "./components/TimeDifferenceCalculator/TimeDifferenceCalculator";

function App() {
  return (
    <div className="App">
      {/* Date Formater */}
      <div className="section">
        <h1>Date Formater</h1>
        <DateFormater />
      </div>

      {/* NewYear countdown*/}

      <div className="section">
        <h1>NewYear countdow!</h1>
        <NewYearCountdown />
      </div>
      {/* Add/Subtract Days*/}

      <div className="section">
        <h1>Add/Subtract Days</h1>
        <AddSubtractDays />
      </div>
      {/* Time Difference Calculator */}

      <div className="section">
        <h1>Time Difference Calculator</h1>
        <TimeDifferenceCalculator />
      </div>
      {/* Simple Date Range Viewer */}

      <div className="section">
        <h1>Simple Date Range Viewer </h1>
        <SimpleDateRangeViewer />
      </div>
    </div>
  );
}

export default App;
