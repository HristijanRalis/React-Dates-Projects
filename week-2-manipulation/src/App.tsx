import "./App.css";
import { DateFormater } from "./components/DateFormater/DateFormater";
import NewYearCountdown from "./components/NewYearCountdown/NewYearCountdown";
import { SimpleDateRangeViewer } from "./components/SimpleDateRangeViewer/SimpleDateRangeViewer";

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
      </div>
      {/* Time Difference Calculator */}

      <div className="section">
        <h1>Time Difference Calculator</h1>
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
