import { useEffect, useState } from "react";
import "./GreetingByTimeOfDay.css";

export const GreetingByTimeOfDay = () => {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const timeGreeting = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Skopje",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(timeGreeting);

      // Get Hour
      const currentHour = new Date(
        now.toLocaleString("en-US", { timeZone: "Europe/Skopje" })
      ).getHours();

      if (currentHour >= 5 && currentHour <= 12) {
        setGreeting("Good Morning ☀️");
      } else if (currentHour >= 12 && currentHour <= 18) {
        setGreeting("Good Afternoon 🌤️");
      } else {
        setGreeting("Good Evening!  🌙");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="GreetingByTimeOfDay">
      <h2 className="greetingTitle">{greeting}</h2>
      <p>Current Time in Bitola: {time}</p>
    </div>
  );
};
