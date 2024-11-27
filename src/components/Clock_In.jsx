import React, { useState, useEffect } from "react";
import { Button } from "./style/buttons";
import { MdLogin, MdLogout } from "./icons";
import toast from "react-hot-toast";

const Clock_In = () => {
  const [time, setTime] = useState(
    () => parseInt(localStorage.getItem("Clock_In_time")) || 0
  );
  const [isRunning, setIsRunning] = useState(
    () => JSON.parse(localStorage.getItem("Clock_In_isRunning")) || false
  );

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        localStorage.setItem("Clock_In_time", time); // Save the timer to local storage every second
        localStorage.setItem("Clock_In_isRunning", isRunning);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning(true);
    toast.success("Timer started!");
  };

  const handleReset = () => {
    setIsRunning(false);
    toast.error("Timer stoped!");
    localStorage.removeItem("Clock_In_time");
    localStorage.removeItem("Clock_In_isRunning");
    setTime(0);
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
      {!isRunning ? (
        <Button
          onClick={handleStart}
          text={"Clock In"}
          icon={<MdLogin size={20} />}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="text-base border border-slate-300 rounded-[0.2rem] p-[6px]">
            {formatTime(time)}
          </div>
          <button
            className="py-[6px] px-3 flex items-center gap-2 rounded-[0.2rem] text-white bg-red-700 hover:bg-red-600"
            onClick={handleReset}
          >
            <MdLogout size={20} /> <span className="text-lg">Clock Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Clock_In;
