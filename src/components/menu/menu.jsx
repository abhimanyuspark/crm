import React, { useEffect, useRef, useState } from "react";
import menu from "./menu.module.css";
import { ThDotV } from "../icons";

const Menu = ({ children }) => {
  const [show, setShow] = useState(false);
  const parentRef = useRef();

  //  Close the dropdown when clicking outside of it or its
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (parentRef.current && !parentRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, parentRef, setShow]);

  return (
    <div className={menu.main} ref={parentRef}>
      <div
        tabIndex={0}
        onClick={() => {
          setShow(!show);
        }}
        className={menu.menuBar}
      >
        <ThDotV />
      </div>
      {show && (
        <ul className={menu.list}>{children ? children : <li>No data</li>}</ul>
      )}
    </div>
  );
};

export default Menu;
