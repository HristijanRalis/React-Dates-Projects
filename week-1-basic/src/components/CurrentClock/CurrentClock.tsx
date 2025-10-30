import { useEffect, useState } from "react";
import "./CurrentClock.css";
export const CurrentClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Skopje",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="CurrentClock">
      <p className="Time">Time : {time}</p>
    </div>
  );
};
