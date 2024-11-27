import React, { useState, useEffect } from "react";
import { FaPlayCircle, FaPauseCircle } from "./icons";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setStart(false);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {!start ? (
        <button
          className="p-2 rounded-md text-white bg-blue-700 hover:bg-blue-600"
          onClick={() => {
            handleStart();
            setStart(true);
          }}
        >
          Start
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <h1>{formatTime(time)}</h1>

          <button
            className="p-2 rounded-md text-white bg-blue-700 hover:bg-blue-600"
            onClick={isRunning ? handlePause : handleStart}
          >
            {isRunning ? <FaPauseCircle /> : <FaPlayCircle />}
          </button>
          <button
            className="p-2 rounded-md text-white bg-red-700 hover:bg-red-600"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
