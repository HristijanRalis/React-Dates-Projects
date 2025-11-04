import { useState } from "react";
import "./TimeDifferenceCalculator.css";
import { endOfToday } from "date-fns";

export const TimeDifferenceCalculator = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [timeDiff, setTimeDff] = useState<string>("");

  const handleCalculationTime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      setTimeDff("Please select both time!");
      return;
    }

    const today = new Date();
    const start = new Date(`${today.toDateString()} ${startTime}`);
    const end = new Date(`${today.toDateString()} ${endTime}`);

    if (end < start) {
      end.setDate(end.getDate() + 1);
    }

    const difMS = end.getTime() - start.getTime();
    const diffMinutes = Math.floor(difMS / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setTimeDff(`${hours} hours and ${minutes} minutes`);
  };
  return (
    <div className="TimeDifferenceCalculator">
      <form className="TimeForm" onSubmit={handleCalculationTime}>
        <div className="TimeContent">
          <label>Start Time: </label>
          <input
            type="time"
            onChange={(e) => setStartTime(e.target.value)}
            className="timeInput"
          />
        </div>
        <div className="TimeContent">
          <label>End Time: </label>
          <input
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
            className="timeInput"
          />
        </div>
        <div className="TimeContent">
          <button type="submit" className="timeBtn">
            Calculate
          </button>
        </div>
      </form>

      <div className="showTime">{timeDiff && <h3>{timeDiff}</h3>}</div>
    </div>
  );
};
