import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DaysUntilEvent.css";

export const DaysUntilEvent = () => {
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const handleDateChange = (date: Date | null) => {
    setEventDate(date);

    if (date) {
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      const differenceInTime = date.getTime() - today.getTime();
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      );
      setDaysLeft(differenceInDays);
    } else {
      setDaysLeft(null);
    }
  };

  return (
    <div className="DaysUntilEvent">
      <form className="EventDate">
        <div className="eventInput">
          <label>Choose Your Event Date: </label>
          <DatePicker
            placeholderText="Select Event Date"
            className="EventPicker"
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>
      </form>

      {daysLeft !== null && (
        <h2>
          {daysLeft > 0
            ? `${daysLeft} day ${
                daysLeft === 1 ? "" : "s"
              } left until your event!`
            : daysLeft === 0
            ? "Your event is today!"
            : "That date has already passed."}
        </h2>
      )}
    </div>
  );
};
