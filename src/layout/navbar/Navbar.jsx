import React from "react";
import { IoMdMenu } from "../../components/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleMenu } from "../../redux/features/layoutSlice";
import Search from "./Search";
import LogOut from "./Logout";
import { FlConverter } from "../../utilities";
// import Theme from "./Theme";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { pathname } = useLocation();

  const RenderPathItems = () => {
    const MAX_VISIBLE_CRUMBS = 3;
    const Keys = ["events"];
    // Split the location string into an array of breadcrumb items
    const crumbs = pathname.split("/").filter((crumb) => crumb !== "");
    const breadcrumbs = crumbs.slice(0, MAX_VISIBLE_CRUMBS);

    return (
      <div className="flex gap-1 text-base">
        {breadcrumbs.map((crumb, index) => {
          if (index > 0 && Keys.includes(crumbs[0])) return null;
          const item = index === 1 && crumb === user?.id ? user?.name : crumb;
          const value = item === "crm_project" ? "Dashboard" : item;

          return (
            <div key={index} className="flex items-baseline gap-1">
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold">{FlConverter(value)}</span>
              ) : (
                <Link
                  to={`/${crumbs.slice(0, index + 1).join("/")}`}
                  className="hover:text-black font-semibold flex gap-1 items-center"
                >
                  {FlConverter(value)}
                  <span className="w-[3px] h-[3px] rounded-[100%] bg-slate-500 block"></span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <nav className="bg-white border-b border-slate-300 flex items-center justify-between px-8">
      <div className="flex gap-2 items-center text-slate-500">
        {/* Menu Button */}
        <div
          className="sm:hidden block"
          onClick={() => {
            dispatch(toggleMenu(true));
          }}
        >
          <IoMdMenu size={25} className="cursor-pointer hover:text-black" />
        </div>

        <RenderPathItems />
      </div>

      <ul className="flex gap-6 items-center">
        {/* <li>
          <Theme />
        </li> */}

        <li>
          <Search />
        </li>

        <li>
          <LogOut />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
