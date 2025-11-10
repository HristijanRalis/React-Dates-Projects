import { useEffect, useState } from "react";
import "./WorldClock.css";

export const WorldClock = () => {
  const cities = [
    { name: "Bitola", timeZone: "Europe/Skopje" },
    { name: "Melbourne", timeZone: "Australia/Melbourne" },
    { name: "Toronto", timeZone: "America/Toronto" },
    { name: "London", timeZone: "Europe/London" },
  ];

  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTime = () => {
      const newTimes: { [key: string]: string } = {};

      cities.forEach((city) => {
        const formater = new Intl.DateTimeFormat("en-GB", {
          timeZone: city.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        newTimes[city.name] = formater.format(new Date());
      });

      setTimes(newTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="WorldClock">
      <h2>🌍 World Clocks</h2>
      {Object.keys(times).map((city) => (
        <div key={city} className="cityItem">
          <strong>{city}:</strong> {times[city]}
        </div>
      ))}
    </div>
  );
};
