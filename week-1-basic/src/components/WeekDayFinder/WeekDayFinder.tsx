import { useState } from "react";
import DatePicker from "react-datepicker";
import "./WeekDayFinder.css";
export const WeekDayFinder = () => {
  const [pickDay, setPickDay] = useState<Date | null>(null);
  const [weekDay, setWeekDay] = useState<string | null>(null);

  const handleWeekDay = (date: Date | null) => {
    setPickDay(date);

    if (date) {
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const dayName = days[date.getDay()];
      setWeekDay(dayName);
    } else {
      setWeekDay(null);
    }
  };
  return (
    <div className="WeekdayFinder">
      <form className="formDate">
        <div className="dayPickerWrapper">
          <label>Select A Day</label>
          <DatePicker
            placeholderText="Select date"
            onChange={handleWeekDay}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </form>

      {weekDay && (
        <h2>
          The day of the week is : <strong>{weekDay}</strong>
        </h2>
      )}
    </div>
  );
};
