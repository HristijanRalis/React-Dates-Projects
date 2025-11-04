import { useState } from "react";
import "./SimpleDateRangeViewer.css";

export const SimpleDateRangeViewer = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRangeDays = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setShowResult(false);
      setTimeout(() => {
        setTotalDays(diffDays);
        setShowResult(true);
      }, 1000);
    } else {
      setShowResult(false);
      setTotalDays(null);
    }
  };
  return (
    <div className="SimpleDateRangeViewer">
      <form className="rangeForm" onSubmit={handleRangeDays}>
        <div className="rangeContent">
          <label>Start Date: </label>
          <input
            type="date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="rangeInput"
          />
        </div>
        <div className="rangeContent">
          <label>End Date: </label>
          <input
            type="date"
            placeholder="Select End Date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="rangeInput"
          />
        </div>
        <div className="rangeContent">
          <button type="submit" className="rangeBtn">
            Calculate
          </button>
        </div>
      </form>

      <div className="totalDays">
        {showResult && totalDays !== null && (
          <h3 className="result">
            Total Days: <span>{totalDays}</span>
          </h3>
        )}
      </div>
    </div>
  );
};
