import { useEffect, useState } from "react";
import "./EventCountdown.css";
export const EventCountdown = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const handleCalculation = () => {
    if (!startDate || !endDate) return "";

    const now = new Date();
    const target = endDate.getTime();
    const diff = target - now.getTime();

    if (diff < 0) return "Event started or finished!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const time = setInterval(() => {
      setTimeLeft(handleCalculation());
    }, 1000);

    return () => clearInterval(time);
  }, [startDate, endDate]);

  return (
    <div className="EventCountdown">
      <form className="eventForm">
        <div className="eventContent">
          <label>Start Date</label>
          <input
            type="date"
            className="eventInput"
            placeholder="Select Start Date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div className="eventContent">
          <label>End Date</label>
          <input
            type="date"
            className="eventInput"
            placeholder="Select End Date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
      </form>

      <div className="dateResult">
        {startDate && endDate ? (
          <h2>{timeLeft || "Calculating..."}</h2>
        ) : (
          <p>Select both start and end date</p>
        )}
      </div>
    </div>
  );
};
