import React, { useEffect, useState } from "react";
import { admin, client, employee } from "../sidebar/data";
import { useSelector } from "react-redux";
import { FaSearch, FaTimes } from "../../components/icons";
import { Link } from "react-router-dom";
import { InputText } from "../../components";

const Search = () => {
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const data = user?.role?.includes("admin")
    ? admin
    : user?.role?.includes("employee")
    ? employee
    : user?.role?.includes("client")
    ? client
    : [];

  useEffect(() => {
    if (show) {
      return;
    } else {
      setQuery("");
    }
  }, [show]);

  const filter = data.filter((item) => {
    if (item.subMenu) {
      const matchingItems = item.subMenu.some((el) =>
        el.value.toLowerCase().includes(query.toLowerCase())
      );
      return matchingItems;
    }
    return item.value.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="search"
        data-tooltip-place="bottom"
        className="cursor-pointer hover:text-black  text-slate-500"
      >
        <FaSearch
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>

      {/* show container */}

      {show && (
        <div
          onClick={() => {
            setShow(false);
          }}
          className="z-[999999] absolute top-0 right-0 flex items-start justify-center w-full h-full bg-[rgba(0,0,0,0.2)]"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="mt-10 bg-white border w-[60%] border-slate-400 rounded-md"
          >
            <div className="border-b p-4 border-slate-300 flex items-center justify-between">
              <h2 className="text-xl">Search</h2>
              <FaTimes
                className="cursor-pointer hover:text-black  text-slate-500"
                onClick={() => {
                  setShow(false);
                }}
              />
            </div>

            <div className="p-4">
              <InputText
                type="text"
                placeholder="Search..."
                focus={true}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>

            {/* data on query */}

            <div className="px-4 pb-4 max-h-52 overflow-auto">
              <ul className="w-full border border-slate-300 rounded-md py-3">
                {filter?.length > 0 ? (
                  filter?.map((d, index) => (
                    <li className="p-2 hover:bg-slate-100" key={index}>
                      <Link
                        className="flex justify-between items-center"
                        to={d.link}
                        onClick={() => setShow(false)}
                      >
                        <span>{d?.value}</span> <span>{d?.link}</span>
                      </Link>
                      {d.subMenu && (
                        <ul className="w-full border border-slate-300 rounded-md">
                          {d.subMenu.map((sm, index) => (
                            <li className="p-2" key={index}>
                              <Link
                                className="flex justify-between items-center"
                                to={sm.link}
                                onClick={() => setShow(false)}
                              >
                                <span>{sm?.value}</span> <span>{sm?.link}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-center p-2">No link found</li>
                )}
              </ul>
            </div>

            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
