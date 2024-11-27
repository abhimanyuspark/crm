import React, { useState } from "react";
import { Container, InputText } from "../../components";
import { settingSideBarData as data } from "../data.json";
import { NavLink } from "react-router-dom";

const Search = ({ value = "", onChange = (i) => i }) => {
  const [search, setSearch] = useState("");

  const filter = data.filter((i) => {
    return i?.title?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container className="sticky top-0 z-[1] rounded-none sm:h-[calc(100vh-65px)] h-auto">
      <div className="border-b border-slate-300 p-4">
        <InputText
          value={search}
          placeholder={"Search settings"}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          focus={true}
        />
      </div>

      <ul>
        {filter.length > 0 ? (
          filter.map((d, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(d?.title);
              }}
              // className={
              //   value === d?.title
              //     ? "bg-slate-400 text-white"
              //     : "text-slate-600 hover:bg-slate-200"
              // }
            >
              <NavLink
                className="block p-2 pl-4 border-b border-slate-300 active:bg-slate-200"
                to={d?.link}
              >
                {d?.title}
              </NavLink>
            </li>
          ))
        ) : (
          <li className="text-slate-600 hover:bg-slate-200 text-center p-2 pl-4 border-b border-slate-300">
            No data found
          </li>
        )}
      </ul>
    </Container>
  );
};

export default Search;
