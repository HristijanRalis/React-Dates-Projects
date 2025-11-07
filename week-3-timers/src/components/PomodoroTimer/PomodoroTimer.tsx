import { useEffect, useRef, useState } from "react";
import "./PomodoroTimer.css";

export const PomodoroTimer = () => {
  const WORK_TIME = 1 * 60;
  const BREAK_TIME = 5 * 60;

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setTime(isWork ? WORK_TIME : BREAK_TIME);
    setIsWork(true);
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const playSound = () => {
    const sound = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );

    sound.play();
  };

  useEffect(() => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            playSound();
            const nextWork = !isWork;
            setIsWork(nextWork);
            setIsRunning(false);
            setTime(nextWork ? WORK_TIME : BREAK_TIME);
            return nextWork ? WORK_TIME : BREAK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
  }, [isRunning, isWork]);

  return (
    <div className="PomodoroTimer">
      <div className="Timer">
        <h1>{formatTime()}</h1>
        <p>{isWork ? "Work Session" : "Break Time"}</p>
      </div>
      <div className="PomodoroBtns">
        <button className="btn" onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btnReset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
