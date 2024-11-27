import React, { Suspense, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { useSideBar } from "../hooks";
import { Loader } from "../components";

const Layout = () => {
  const [isOpen] = useSideBar();
  const parentRef = useRef();
  const { pathname } = useLocation();
  // Reset scroll position to the top of the main element when the Outlet content changes
  useEffect(() => {
    parentRef.current.scrollTop = 0;
  }, [parentRef, pathname]);

  return (
    <div
      style={{
        transition: "0.2s ease-in-out",
      }}
      className={`${
        isOpen ? "sm:grid-cols-[240px_1fr]" : "sm:grid-cols-[60px_1fr]"
      } grid grid-cols-[0px_1fr]`}
    >
      <Sidebar />

      <div className="grid grid-rows-[60px_1fr]">
        <Navbar />
        <main
          ref={parentRef}
          className="h-[calc(100vh-60px)] relative overflow-auto scroll-smooth bg-gray-100"
        >
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
