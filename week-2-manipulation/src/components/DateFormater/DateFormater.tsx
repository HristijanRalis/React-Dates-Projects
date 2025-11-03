import "./DateFormater.css";
import { useState } from "react";

export const DateFormater = () => {
  const [date, setDate] = useState<Date | null>(null);

  const handleTimeFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected) setDate(new Date(selected));
  };

  const euFormat = date
    ? `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${date.getFullYear()}`
    : "";

  const usFormat = date
    ? `${date.getMonth().toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`
    : "";

  const isoFormat = date ? date.toISOString().split("T")[0] : "";

  return (
    <div className="DateFormater">
      <h2>Pick a date!</h2>
      <input type="date" onChange={handleTimeFormat} className="pickDate" />

      {date && (
        <div className="standards">
          <h2>EU standard: {euFormat}</h2>
          <h2>US standard: {usFormat}</h2>
          <h2>ISO standard: {isoFormat}</h2>
        </div>
      )}
    </div>
  );
};
