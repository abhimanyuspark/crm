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
    const pathSegments = pathname.split("/").slice(0); // Get segments after the root
    const displayNames = []; // Array to hold the names to display
  
    // Check the segments and push the desired names into the displayNames array
    if (pathSegments.length > 0) {
      displayNames.push("Dashboard"); // Always show "Dashboard"
    }
    if (pathSegments[1]) {
      const p = FlConverter(pathSegments[1])
      displayNames.push(p);
    }

    const checkLink = displayNames[0] === "Dashboard" ? "" : displayNames.slice(0, index + 1).join("/")
  
    return (
      <div className="flex gap-1 text-base">
        {displayNames.map((name, index) => (
          <div key={index} className="flex items-baseline gap-1">
            {index === displayNames.length - 1 ? (
              <span className="font-semibold">{FlConverter(name)}</span>
            ) : (
              <Link
                to={`/${checkLink}`} // Create the link based on the displayed names
                className="hover:text-black font-semibold flex gap-1 items-center"
              >
                {FlConverter(name)}
                <span className="w-[3px] h-[3px] rounded-[100%] bg-slate-500 block"></span>
              </Link>
            )}
          </div>
        ))}
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
