import React from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "../icons";

const SortingIcons = ({ header, onClick }) => {
  return (
    header.column.getCanSort() && (
      <div className="flex" onClick={onClick}>
        <FaLongArrowAltUp
          className={`hover:text-red-500 w-[6px] ${
            header.column.getIsSorted() === "asc" ? "text-red-500" : ""
          }`}
        />
        <FaLongArrowAltDown
          className={`hover:text-red-500 w-[6px] ${
            header.column.getIsSorted() === "desc" ? "text-red-500" : ""
          }`}
        />
      </div>
    )
  );
};

export default SortingIcons;
