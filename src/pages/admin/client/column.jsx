import { CheckBox } from "../../../components/style/inputs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Select } from "../../../components";
import { updateStatus, deleteUser } from "../../../redux/server/server";
import {
  deleteUserReducer,
  setLoading,
  statusUpdate,
} from "../../../redux/features/roleUsers";
import { FaEdit, FaTrash, FaEye } from "../../../components/icons";
import { initialData } from "../../data.json";
const initialImage = initialData[0].initialImage;

export const Columns = [
  // {
  //   id: "select",
  //   enableSorting: false,
  //   header: ({ table }) => {
  //     return (
  //       <CheckBox
  //         checked={table.getIsAllRowsSelected()}
  //         indeterminate={table.getIsSomeRowsSelected()}
  //         onChange={table.getToggleAllRowsSelectedHandler()}
  //       />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <CheckBox
  //         checked={row.getIsSelected()}
  //         disabled={!row.getCanSelect()}
  //         indeterminate={row.getIsSomeSelected()}
  //         onChange={row.getToggleSelectedHandler()}
  //       />
  //     );
  //   },
  // },
  {
    accessorKey: "index",
    header: "Id",
    cell: (info) => {
      const index = info.row.index;
      return <span>{index + 1}</span>;
    },
    enableSorting: true,
    sortingFn: (row1, row2) => {
      return row1.index > row2.index ? -1 : 1;
    },
    sortDescFirst: false,
    invertSorting: true,
  },
  {
    accessorKey: "profile",
    enableSorting: false,
    header: () => "Profile",
    cell: (info) => {
      const value = info.getValue();
      return (
        <img
          src={value}
          alt="profile"
          loading="lazy"
          className="w-10 aspect-square rounded-full"
          onError={(e) => (e.currentTarget.srcset = initialImage)}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: () => "Name",
    cell: (info) => {
      const value = info.getValue();
      const { id } = info.row.original;
      return (
        <div className="w-44 cursor-pointer">
          <Link
            to={`/crm_project/clients/${id}`}
            className="text-sm hover:underline text-slate-700 font-semibold"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => "Email",
    cell: (info) => {
      const value = info.getValue();
      return <div className="w-52 text-sm">{value}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <span>Date</span>,
    cell: (info) => {
      const value = info.getValue();
      const date = new Date(value);
      return <span>{date.toLocaleDateString()}</span>;
    },
    sortDescFirst: false,
  },
  {
    accessorKey: "age",
    header: () => "Age",
    sortDescFirst: false,
    cell: (info) => {
      const value = info.getValue();
      return value ? <>{value}</> : "--";
    },
  },
  {
    accessorKey: "visits",
    sortDescFirst: false,
    header: () => <span>Visits</span>,
    cell: (info) => {
      const value = info.getValue();
      return value ? <>{value}</> : "--";
    },
  },
  // {
  //   accessorKey: "progress",
  //   header: "Progress",
  //   cell: (info) => {
  //     const value = info.getValue();
  //     return value ? <div className="w-10">{value}</div> : "--";
  //   },
  //   sortDescFirst: false,
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const value = info.getValue();
      const { id, name } = info.row.original;
      const [val, setVal] = useState(value);
      const dispatch = useDispatch();
      const { user } = useSelector((state) => state.auth);
      const options = user?.statusMenu;

      const Status = async (status) => {
        if (val?.name === status?.name) return null;
        setVal(status);
        await dispatch(statusUpdate({ id, status }));
        await toast.promise(
          dispatch(updateStatus({ id, status })),
          {
            loading: "Updating...",
            success: <b>{`${name} status is Update`}</b>,
            error: <b>{`${name} status is not Update`}</b>,
          },
          { position: "top-right" }
        );
      };

      const Templete = (o) => {
        return (
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: o?.color }}
              className="w-3 h-3 rounded-full"
            ></span>
            <span>{o?.name}</span>
          </div>
        );
      };

      return val ? (
        <Select
          optiontemplete={Templete}
          valuetemplete={Templete}
          width="8em"
          optionswidth="9em"
          options={options}
          value={val}
          fields={(l) => l.name}
          onChange={(o) => {
            Status(o);
          }}
        />
      ) : (
        "--"
      );
    },
    sortingFn: (row1, row2, column) => {
      return row1.getValue(column).name > row2.getValue(column).name ? -1 : 1;
    },
    sortDescFirst: false,
    invertSorting: true,
  },
  {
    accessorKey: "id",
    enableSorting: false,
    header: () => "Actions",
    cell: (info) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
      const { id, name } = info.row.original;

      const Edit = (id) => {
        navigate(`/crm_project/clients/${id}/edit`, {
          state: { from: location },
        });
      };

      const View = (id) => {
        navigate(`/crm_project/clients/${id}`, { state: { from: location } });
      };
      const Delete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: `You want to delete ${name} user!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            dispatch(setLoading(true));
            await dispatch(deleteUser(id));
            await dispatch(deleteUserReducer(id));
            dispatch(setLoading(false));
            toast.success(`${name} deleted successfull`, {
              position: "top-right",
            });
          }
        });
      };

      return (
        <Menu>
          <li
            onClick={() => {
              Edit(id);
            }}
          >
            <FaEdit /> Edit
          </li>
          <li
            onClick={() => {
              View(id);
            }}
          >
            <FaEye /> View
          </li>
          <li
            onClick={() => {
              Delete(id);
            }}
          >
            <FaTrash /> Delete
          </li>
        </Menu>
      );
    },
  },
];
