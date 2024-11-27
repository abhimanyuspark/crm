import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const FilterTable = ({ label = "Filter", children, onChangeClear }) => {
  const [open, setOpen] = useState(false);

  const innerStyle = { transition: "0.3s ease" };

  return (
    <div tabIndex={0} onBlur={() => setOpen(false)}>
      <div
        className="flex gap-2 items-center text-slate-500 cursor-pointer hover:text-black text-[15px]"
        onClick={() => setOpen(!open)}
      >
        <span>Filter</span>
        <FaFilter size={15} />
      </div>

      {/* Filter Component */}
      <div
        style={innerStyle}
        className={`fixed w-64 h-full bg-white top-[60px] border-x border-slate-300 ${
          open ? "right-0" : "-right-64"
        }`}
      >
        {/* Header */}
        <div className="border-b border-slate-300 p-[11px] flex items-center justify-between text-[18px] text-slate-500">
          <h2>{label}</h2>
          <FaTimes
            onClick={() => setOpen(false)}
            className="hover:text-black cursor-pointer"
            size={15}
          />
        </div>
        {/* Categories and Filters */}
        <div className="w-full h-[calc(100%-170px)] overflow-auto relative">
          {children}
        </div>

        {/* Clear */}
        <div className="border-t bg-white border-slate-300 p-3">
          <div
            className="p-2 hover:bg-slate-300 rounded-[4px] text-sm text-center border border-slate-300"
            onClick={onChangeClear}
          >
            Clear
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTable;
