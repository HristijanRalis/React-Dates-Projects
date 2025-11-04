import { useState } from "react";
import "./AddSubtractDays.css";

const AddSubtractDays = () => {
  const [baseDate, setBaseDate] = useState<string>("");
  const [days, setDays] = useState<number>(0);
  const [result, setResult] = useState<string>("");

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!baseDate || isNaN(days)) {
      setResult("Please select date and enter a number of days!");
      return;
    }

    const originalDate = new Date(baseDate);

    originalDate.setDate(originalDate.getDate() + days);

    const formatted = `${originalDate.getDate().toString().padStart(2, "0")}.${(
      originalDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${originalDate.getFullYear()}`;

    setResult(formatted);
  };
  return (
    <div className="AddSubtractDays">
      <form className="DaysForm" onSubmit={handleCalculate}>
        <div className="daysContent">
          <label>Select Date:</label>
          <input
            type="date"
            onChange={(e) => setBaseDate(e.target.value)}
            className="daysInput"
          />
        </div>
        <div className="daysContent">
          <label> Enter Days (e.g. +5 or -3):</label>
          <input
            type="number"
            onChange={(e) => setDays(Number(e.target.value))}
            className="daysInput"
          />
        </div>
        <div className="daysContent">
          <button className="CalculationBtn">Calculate</button>
        </div>
      </form>

      <div className="result">{result && <h3>{result}</h3>}</div>
    </div>
  );
};

export default AddSubtractDays;
