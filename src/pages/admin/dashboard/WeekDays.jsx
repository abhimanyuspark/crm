import React, { memo } from "react";

const getWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();

  // Subtract the current day of the week to get the starting date of the week
  // Adjust to make Monday the start of the week
  const startingDateOfTheWeek =
    today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);

  const startOfWeek = new Date(today.setDate(startingDateOfTheWeek));
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date.toLocaleDateString());
  }

  return weekDates;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// const colors = ["red", "blue", "green"];

const WeeksDays = memo(() => {
  const weekDates = getWeekDates();

  return (
    <>
      <div className="flex justify-between p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold">Weekly Timelogs</h2>
      </div>
      <div className="flex gap-2 p-4">
        {days.map((day, index) => (
          <Day
            key={index}
            dayName={day}
            date={weekDates[index]}
            // color={colors[index % colors.length]}
          />
        ))}
      </div>
    </>
  );
});

const Day = ({ dayName, date, color }) => {
  const todayIndex = new Date().getDay();
  // Adjust todayIndex to make Monday the start of the week
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  const isToday =
    days[adjustedIndex] === dayName
      ? "bg-blue-600 text-white"
      : "hover:bg-slate-200";

  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`${date}`}
      data-tooltip-place="bottom"
      className={`flex items-center justify-center text-xs rounded-full w-9 aspect-square border border-slate-300 cursor-pointer ${isToday}`}
      // style={{ backgroundColor: color }}
    >
      {dayName.slice(0, 2)}
    </div>
  );
};

export default WeeksDays;
