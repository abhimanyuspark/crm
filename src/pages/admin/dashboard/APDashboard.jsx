import React from "react";
import { useSelector } from "react-redux";
import {
  Calender,
  // Clock_In,
  Container,
  DigitalClock,
} from "../../../components";
import TaskList from "./TasksList";
import WeeksDays from "./WeekDays";
// import { makeData } from "../../../data/makeData";

const APDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* {JSON.stringify(makeData(10))} */}
      <div className="flex flex-col sm:gap-0 gap-2 sm:flex-row sm:justify-between items-start sm:items-center pt-4">
        <h1 className="text-xl font-bold">Welcome {user?.name}</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <DigitalClock />
          {/* <Clock_In /> */}
        </div>
      </div>

      <div className="grid lg:grid-cols-[45%_55%] gap-4 grid-rows-1">
        {/*//? column 1 */}

        <div className="w-full flex gap-4 flex-col">
          {/* Profile Card */}
          <Container>
            <div className="p-4 flex items-start gap-4 border-b border-slate-200">
              <img src={user?.profile} className="w-24 aspect-square" />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">{user?.name}</h3>
                <p className="text-[15px] font-semibold text-[var(--cl-gr)]">
                  {user?.jobType}
                </p>
                <p className="text-sm">Id-{user?.id}</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4">
              <div className="text-center text-sm">
                <p>{user?.projects?.length}</p>
                <p>Projects</p>
              </div>

              <div className="text-center text-sm">
                <p>{user?.tasks?.length}</p>
                <p>Tasks</p>
              </div>
            </div>
          </Container>

          {/* Tasks */}
          <Container>
            <TaskList tasks={user?.tasks} />
          </Container>
        </div>

        {/*//? column 2 */}

        <div className="w-full flex gap-4 flex-col">
          {/* WeeksDays */}
          <Container>
            <WeeksDays />
            <div className="px-4">
              <progress
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.progress || 0}
                data-tooltip-place="top"
                value={user?.progress}
                max={100}
                className="w-full h-3"
              ></progress>
              <div className="flex justify-between text-sm pb-2">
                <span>0 min</span>
                <span>100 max</span>
              </div>
            </div>
          </Container>

          {/* My Calender */}
          <Container>
            <h2 className="text-xl font-bold p-4 border-b border-slate-200">
              My Calender
            </h2>
            <div className="p-4">
              <Calender userId={user?.id} events={user?.events} />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default APDashboard;
