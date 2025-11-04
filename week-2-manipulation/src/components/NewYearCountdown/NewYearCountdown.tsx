import { useEffect, useState } from "react";
import "./NewYearCountdown.css";
const NewYearCountdown = () => {
  const [today, setToday] = useState(new Date());
  const [newYear, setNewYear] = useState(
    new Date(new Date().getFullYear() + 1, 0, 1)
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isNewYear, setIsNEwYear] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = newYear.getTime() - now.getTime();

    if (difference < 0) {
      setIsNEwYear(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="NewYearCountdown">
      <h2>Countdown Timer!</h2>

      {isNewYear ? (
        <h3>Happy New Year??</h3>
      ) : (
        <h3>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </h3>
      )}
    </div>
  );
};

export default NewYearCountdown;
