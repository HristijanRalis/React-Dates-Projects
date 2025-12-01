import { useState } from "react";
import "./SimpleCalendar.css";
const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "november", days: 30 },
  { name: "December", days: 31 },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const SimpleCalendar = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState(today.getMonth());

  const getDaysInMonth = () => {
    if (monthIndex === 1) {
      return year % 4 === 0 ? 29 : 28;
    }

    return months[monthIndex].days;
  };

  const buildCalendarGrid = () => {
    const totalDays = getDaysInMonth();
    const grid = [];

    let firstDay = new Date(year, monthIndex, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < firstDay; i++) {
      grid.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      grid.push(d);
    }

    while (grid.length % 7 !== 0) {
      grid.push(null);
    }

    return grid;
  };

  const prevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const grid = buildCalendarGrid();

  const nextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };
  return (
    <div className="SimpleCalendar">
      <header className="header">
        <button onClick={prevMonth}>◀</button>
        {months[monthIndex].name} {year}
        <button onClick={nextMonth}>▶</button>
      </header>

      <div className="weekDays">
        {weekDays.map((day) => (
          <div className="weekday" key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid">
        {grid.map((cell, i) => (
          <div className="cell" key={i}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};
