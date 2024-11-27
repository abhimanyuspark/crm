import React from "react";
import { useExpand, useInternetCheck, useSideBar } from "../../hooks";
import Content from "./Content";
import { FaAngleLeft, FaAngleRight } from "../../components/icons";
import SVG from "../../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../redux/features/layoutSlice";

const Sidebar = () => {
  const [isOpen] = useSideBar();
  const [expand, toggleExpand] = useExpand();
  const { menu } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const onMouseEnter = () => {
    if (isOpen) return;
    toggleExpand(true);
  };
  const onMouseLeave = () => {
    if (isOpen) return;
    toggleExpand(false);
  };

  return (
    <aside className="relative">
      <div
        className={`sm:relative absolute z-10 ${
          menu ? "sm:block grid grid-cols-[240px_1fr]" : "sm:block hidden"
        }`}
        style={{
          transition: "0.2s ease-in-out",
        }}
      >
        <div
          className={`grid sm:grid-rows-[60px_calc(100vh-120px)_60px] grid-rows-[60px_calc(100vh-60px)] border-r border-slate-300 bg-[var(--bg-dk-bl)] h-full ${
            expand ? "w-[240px]" : "w-full"
          }`}
          style={{
            transition: "0.2s ease-in-out",
          }}
        >
          <Header open={expand || isOpen} />
          <ul
            id="aside"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="overflow-y-scroll overflow-x-hidden select-none"
          >
            <Content />
          </ul>
          <Footer />
        </div>
        <div
          onClick={() => {
            dispatch(toggleMenu(false));
          }}
          className="w-[calc(100vw-240px)] h-full bg-[rgba(0,0,0,0.3)]"
        ></div>
      </div>
    </aside>
  );
};

const Header = ({ open }) => {
  const { user } = useSelector((state) => state.auth);
  const { menu } = useSelector((state) => state.layout);
  const isOnline = useInternetCheck();

  return (
    <div
      className={`relative border-b border-slate-600 flex items-center text-[var(--cl-sky)] px-4 py-2`}
    >
      <div
        style={{ transition: "0.3s ease-in-out" }}
        className={`flex flex-col items-start absolute w-24 ${
          open ? "sm:opacity-100" : "left-2 sm:opacity-0"
        }`}
      >
        <h3 className="text-lg font-bold text-center">CRM</h3>
        <p className="text-sm text-white truncate w-auto flex items-center gap-2">
          <span
            style={
              isOnline ? { background: "lightgreen" } : { background: "red" }
            }
            className="w-3 h-3 rounded-full"
          ></span>
          {user?.name}
        </p>
      </div>

      <img
        style={{ transition: "0.5s ease-in-out" }}
        loading="lazy"
        src={SVG}
        alt="logo"
        className={`w-auto h-auto rounded-sm p-1 absolute bg-[var(--bg-dk-bl)] ${
          menu || open ? "right-2" : "sm:left-1"
        }`}
      />
    </div>
  );
};

const Footer = () => {
  const [isOpen, toggleSidebar] = useSideBar();

  return (
    <div
      className={`sm:flex hidden items-center border-t border-slate-600 ${
        isOpen ? "justify-between p-2" : "justify-center"
      }`}
    >
      <div className="text-[var(--cl-sky)] cursor-pointer">
        {isOpen ? (
          <FaAngleLeft size={20} onClick={toggleSidebar} />
        ) : (
          <FaAngleRight size={20} onClick={toggleSidebar} />
        )}
      </div>

      {isOpen && (
        <p className="py-[2px] px-1 rounded-sm text-xs text-[var(--cl-sky)] bg-[var(--blue)]">
          ver 1.0.0
        </p>
      )}
    </div>
  );
};

export default Sidebar;
