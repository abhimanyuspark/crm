import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const MiniTable = ({ Columns = [], data = [], loading = false }) => {
  const columns = useMemo(() => Columns, [Columns]);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
  });

  const Loading = () => {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="px-4 py-2 border border-slate-300 rounded-md bg-white">
          loading...
        </div>
      </div>
    );
  };

  const columnSpan = useMemo(() => {
    return table.getHeaderGroups().map((d) => d.headers.length);
  }, []);

  return (
    <div className="w-full lg:overflow-visible overflow-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="p-2 text-sm text-left last:text-right"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columnSpan}>{Loading()}</td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        className={`w-auto p-2 text-sm last:text-right`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr className="p-2">
              <td colSpan={columnSpan}>
                <div className="flex items-center justify-center p-2">
                  No data Found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MiniTable;
