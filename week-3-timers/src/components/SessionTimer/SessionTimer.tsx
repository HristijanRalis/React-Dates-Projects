import { useEffect, useRef, useState } from "react";
import "./SessionTimer.css";

export const SessionTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);
  return (
    <div className="SessionTimer">
      <div className="sessionTimer">
        <h2>{formatTime()}</h2>
      </div>
      <div className="sessionBtns">
        <button className="btnSession" onClick={handleStart}>
          Start
        </button>
        <button className="btnSession" onClick={handleStop}>
          Stop
        </button>
        <button className="btnSession" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
