import React from "react";
import { MiniTable } from "../../../components";

const TasksList = ({ tasks }) => {
  const columns = [
    {
      accessorKey: "index",
      header: "Id",
      cell: (info) => {
        const index = info.row.index;
        return <span>Task_id_{index + 1}</span>;
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="">
            <p>{value}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="">
            <p>{value}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "end",
      header: "Due Date",
      cell: (info) => {
        const value = info.getValue();
        const formate = new Date(value).toLocaleDateString();
        return <p className="text-red-500">{formate}</p>;
      },
    },
  ];

  return (
    <div>
      <div className="p-4 border-b border-slate-300">
        <h2 className="text-xl font-bold">Tasks</h2>
      </div>
      <div className="p-2">
        <MiniTable data={tasks} Columns={columns} />
      </div>
    </div>
  );
};

export default TasksList;
