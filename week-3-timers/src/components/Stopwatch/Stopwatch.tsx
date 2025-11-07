import { useEffect, useRef, useState } from "react";
import "./Stopwatch.css";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const handlePause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")} : ${milliseconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="Stopwatch">
      <div className="container">
        <div className="row TIME">
          <h1>{formatTime()}</h1>
        </div>
        <div className="row">
          <div className="timerBtns">
            <button className="btn" onClick={handleStart}>
              Start
            </button>
            <button className="btn" onClick={handlePause}>
              Pause
            </button>
            <button className="btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
