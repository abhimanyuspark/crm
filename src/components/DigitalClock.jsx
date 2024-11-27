import React, { useState, useEffect, memo } from "react";

const DigitalClock = memo(() => {
  const [time, setTime] = useState(new Date());
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-lg flex flex-col items-end">
      <span>
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          // second: "2-digit",
        })}
      </span>
      <span className="text-xs">{daysOfWeek[time.getDay()]}</span>
    </div>
  );
});

export default DigitalClock;
