import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { rangePresets } from "./data";

const DateRangePicker = ({
  value = { start: new Date(), end: new Date() },
  onChange = (p) => p,
}) => {
  const handleStartDateChange = (date) => {
    onChange({ ...value, start: date });
  };

  const handleEndDateChange = (date) => {
    onChange({ ...value, end: date });
  };

  return (
    <div className="relative flex gap-4 p-[6px] items-center group/show hover:bg-slate-200 rounded-sm">
      <p className="text-[15px] font-semibold">Date Range</p>

      <ul className="group-hover/show:visible invisible absolute top-9 left-0 w-28 h-auto bg-white border border-slate-300 z-10">
        {rangePresets?.map((d, i) => (
          <li
            key={i}
            className={`${
              value?.start === d?.value.start && value?.end === d?.value?.end
                ? "bg-slate-500 text-white"
                : "hover:bg-slate-300"
            } p-2 text-sm cursor-pointer`}
            onClick={() => {
              onChange(d?.value);
            }}
          >
            {d?.label}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 items-center">
        <DatePicker
          selected={value?.start}
          onChange={handleStartDateChange}
          selectsStart
          dateFormat={"dd/MM/YYYY"}
          startDate={value?.start}
          endDate={value?.end}
          className="w-20 border-0 focus:outline-0 bg-transparent"
          calendarClassName="left-20 -top-[4px] border-slate-300"
          showYearDropdown
          showMonthDropdown
          placeholderText="Start date"
          maxDate={value?.end}
        />
        <span>To</span>
        <DatePicker
          selected={value?.end}
          onChange={handleEndDateChange}
          selectsEnd
          dateFormat={"dd/MM/YYYY"}
          startDate={value?.start}
          endDate={value?.end}
          className="w-20 border-0 focus:outline-0 bg-transparent"
          calendarClassName="left-20 -top-[4px] border-slate-300"
          showYearDropdown
          showMonthDropdown
          placeholderText="End date"
          minDate={value?.start}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
