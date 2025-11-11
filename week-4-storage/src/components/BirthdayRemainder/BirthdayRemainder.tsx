import { useEffect, useState } from "react";
import "./BirthdayRemainder.css";
import { preconnect } from "react-dom";

type BirthDay = {
  name: string;
  date: string;
};

export const BirthdayRemainder = () => {
  const [birthdays, setBirthdays] = useState<BirthDay[]>(() => {
    const saved = localStorage.getItem("birthdays");
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Function to calculate days until birthday
  const daysUntilBirthday = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Function for sett localStorage with birthday
  const handleCalculation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !birthDate) return;

    const newList = [...birthdays, { name, date: birthDate }];
    setBirthdays(newList);
    localStorage.setItem("birthdays", JSON.stringify(newList));
    setName("");
    setBirthDate("");
  };

  return (
    <div className="BirthdayRemainder">
      <h2>🎂 Birthday Reminder</h2>
      <form className="birthdayForm" onSubmit={handleCalculation}>
        <div className="birthdayInput">
          <label>Enter Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="birthdayInput">
          <label>Set Birthday</label>
          <input
            type="date"
            placeholder="Enter Birthday"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <button className="birthdayBtn" type="submit">
          Submit
        </button>
      </form>

      <ul className="birthdayList">
        {birthdays.map((birthday, i) => (
          <li key={i} className="birthdayItem">
            {birthday.name} - {birthday.date} -{" "}
            {daysUntilBirthday(birthday.date)} days left
          </li>
        ))}
      </ul>
    </div>
  );
};
