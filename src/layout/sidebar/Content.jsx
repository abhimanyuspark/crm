import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { admin, client, employee } from "./data";
import { FaAngleRight, FaAngleDown } from "../../components/icons";
import { useSideBar } from "../../hooks";

const Content = () => {
  const [isOpen] = useSideBar();

  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  const data = user?.role?.includes("admin")
    ? admin
    : user?.role?.includes("employee")
    ? employee
    : user?.role?.includes("client")
    ? client
    : [];

  const handleIndex = (i) => {
    setActiveChildIndex((prevIndex) => (prevIndex === i ? null : i));
  };

  const isChildActive = (i) => {
    const currentSubMenu = data[i]?.subMenu;
    return (
      currentSubMenu && currentSubMenu.some((item) => item.link === pathname)
    );
  };

  useEffect(() => {
    if (isOpen === false) {
      setActiveChildIndex(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const foundIndex = data?.findIndex((d) => {
      const currentSubMenu = d.subMenu;
      return (
        currentSubMenu && currentSubMenu.some((item) => item.link === pathname)
      );
    });

    if (foundIndex !== -1) {
      setActiveChildIndex(foundIndex);
    } else {
      setActiveChildIndex(null);
    }
  }, [pathname]);

  return (
    <>
      {data?.map((d, i) => (
        <Child
          item={d}
          key={i}
          activeIndex={activeChildIndex}
          isChildActive={isChildActive}
          index={i}
          handleIndex={handleIndex}
        />
      ))}
    </>
  );
};

const Child = ({ item, activeIndex, index, handleIndex, isChildActive }) => {
  return (
    <li className="cursor-pointer text-[15px] border-b border-slate-600 text-white ">
      {item?.link ? (
        <NavLink
          onClick={() => {
            handleIndex(index);
          }}
          to={item?.link}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--cl-sky)] h-12 flex items-center px-4 gap-4"
              : "hover:text-[var(--cl-sky)] h-12 flex items-center px-4 gap-4"
          }
        >
          <div className="text-lg">{item?.icon}</div>
          <p>{item?.value}</p>
        </NavLink>
      ) : (
        <div>
          <div
            onClick={() => {
              handleIndex(index);
            }}
            className={`h-12 flex items-center gap-4 px-4 hover:text-[var(--cl-sky)] ${
              isChildActive(index) ? "text-[var(--cl-sky)]" : ""
            }`}
          >
            <div className="text-lg">{item?.icon}</div>

            <div className="flex items-center justify-between w-full">
              <p>{item?.value}</p>
              <div>
                {activeIndex === index ? <FaAngleDown /> : <FaAngleRight />}
              </div>
            </div>
          </div>

          <div className={`flex flex-col pl-[50px]`}>
            {activeIndex === index &&
              item?.subMenu?.map((s, i) => {
                return (
                  <NavLink
                    style={{ paddingBottom: "12px" }}
                    to={s?.link}
                    key={i}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[var(--cl-sky)]"
                        : "" + "hover:text-[var(--cl-sky)]"
                    }
                  >
                    {s?.value}
                  </NavLink>
                );
              })}
          </div>
        </div>
      )}
    </li>
  );
};

export default Content;
