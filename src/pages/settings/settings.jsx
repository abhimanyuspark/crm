import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "../../components";
import Search from "./Search";

const Settings = () => {
  const [tab, setTab] = useState("Profile");

  return (
    <div className="grid lg:grid-cols-[250px_1fr] grid-cols-1">
      <Search value={tab} onChange={(t) => setTab(t)} />

      <div className="p-4">
        <Container>
          <div className="border-b border-slate-300 p-4">
            <h2 className="text-xl font-bold">{tab}</h2>
          </div>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Settings;
