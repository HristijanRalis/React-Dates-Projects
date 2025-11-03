import "./App.css";
import { DateFormater } from "./components/DateFormater/DateFormater";

function App() {
  return (
    <div className="App">
      {/* Date Formater */}
      <div className="section">
        <h1>Date Formater</h1>
        <DateFormater />
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
      </div>
    </div>
  );
}

export default App;
