import React from "react";
import { Container, PieChartUsage } from "../../../components";
import { FaLayerGroup } from "../../../components/icons";
import { useSelector } from "react-redux";

const ClientDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4 grid gap-8">
      <div className="grid grid-cols-3 gap-8">
        <Container>
          <div className="flex h-full justify-between items-center p-6">
            <div className="flex h-full flex-col justify-between">
              <h1 className="text-base">Total Projects</h1>
              <p className="text-xl font-bold text-blue-500">
                {user?.projects?.length}
              </p>
            </div>
            <FaLayerGroup size={30} className="text-slate-400" />
          </div>
        </Container>

        <Container>
          <div className="flex h-full justify-between items-center p-6">
            <div className="flex h-full flex-col justify-between">
              <h1 className="text-base">Total Invoices</h1>
              <p className="text-xl font-bold text-blue-500">
                {user?.invoices?.length || 0}
              </p>
            </div>
            <FaLayerGroup size={30} className="text-slate-400" />
          </div>
        </Container>

        {/* <Container></Container> */}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <Container>
          <div className="p-4 border-b border-slate-300">
            <h2 className="text-lg">Projects</h2>
          </div>
          <div className="p-4">
            <PieChartUsage data={user?.projects} label={"Projects"} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ClientDashboard;
