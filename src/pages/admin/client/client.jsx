import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleUsers } from "../../../redux/server/server";
import {
  Button,
  ClearButton,
  DateRangePicker,
  FilterTable,
  InputText,
  Select,
  SubNavBar,
  SubNavChild,
  Table,
  Label,
} from "../../../components";
import { Columns } from "./column";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaSearch, FaTimesCircle } from "../../../components/icons";
import { ClientsData } from "../../data.json";
import {
  filterUsers,
  restore,
  setLoading,
} from "../../../redux/features/roleUsers";
const { followUp, status } = ClientsData;

const Client = () => {
  const { users, loading } = useSelector((state) => state.users);
  const [globalFilter, setGlobalFilter] = useState("");
  const [clear, setClear] = useState(false);

  const [data, setData] = useState({
    allowFollowUp: { type: "All" },
    status: { name: "All" },
    dates: {
      start: "",
      end: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const filterUsersData = async (filterData) => {
    dispatch(setLoading(true));
    await dispatch(filterUsers(filterData));
    dispatch(setLoading(false));
  };

  const onClear = () => {
    setData((p) => ({
      ...p,
      allowFollowUp: { type: "All" },
      status: { name: "All" },
      dates: {
        start: "",
        end: "",
      },
    }));
    setClear(false);
    setGlobalFilter("");

    //Reset Filter users
    filterUsersData({
      ...data,
      allowFollowUp: { type: "All" },
      status: { name: "All" },
      dates: {
        start: "",
        end: "",
      },
    });
  };

  const onDatesChange = (dates) => {
    setClear(true);
    setData((p) => {
      const newDate = { ...p.dates, ...dates };
      return { ...p, dates: newDate };
    });

    // Filter users here
    filterUsersData({ ...data, dates });
  };

  const handleStatusChange = (selectedStatus) => {
    setData((p) => ({ ...p, status: selectedStatus }));
    setClear(true);

    // Filter users here
    filterUsersData({ ...data, status: selectedStatus });
  };

  const handleAllowFollowUpChange = (selectedFollowUp) => {
    setData((p) => ({ ...p, allowFollowUp: selectedFollowUp }));
    setClear(true);

    // Filter users here
    filterUsersData({ ...data, allowFollowUp: selectedFollowUp });
  };

  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value);
    if (value === "") {
      setClear(false);
    } else {
      setClear(true);
    }
  };

  useEffect(() => {
    dispatch(roleUsers("client"));
    return () => dispatch(restore());
  }, [dispatch, pathname]);

  return (
    <>
      <SubNavBar>
        <SubNavChild>
          <DateRangePicker value={data.dates} onChange={onDatesChange} />
        </SubNavChild>

        <SubNavChild>
          <InputText
            focus={true}
            icon={<FaSearch className="text-slate-500" size={15} />}
            type="search"
            height="33px"
            value={globalFilter}
            placeholder="Search here.."
            onChange={(e) => {
              handleGlobalFilterChange(e?.target?.value);
            }}
          />
        </SubNavChild>

        {clear && (
          <SubNavChild>
            <div className="px-1">
              <ClearButton icon={<FaTimesCircle />} onClick={onClear} />
            </div>
          </SubNavChild>
        )}

        <SubNavChild>
          <FilterTable
            label="Filter Clients"
            onChangeClear={() => {
              setData((p) => ({
                ...p,
                allowFollowUp: { type: "All" },
                status: { name: "All" },
              }));
              //Reset Filter users
              filterUsersData({
                ...data,
                allowFollowUp: { type: "All" },
                status: { name: "All" },
              });
            }}
          >
            <div className="p-4 flex gap-4 flex-col">
              {/* allowFollowUp */}
              <Label label="Allow FollowUp">
                <Select
                  options={followUp}
                  onChange={(d) => {
                    handleAllowFollowUpChange(d);
                  }}
                  value={data?.allowFollowUp}
                  fields={(i) => i?.type}
                />
              </Label>

              {/* Status */}
              <Label label="Status">
                <Select
                  options={status}
                  onChange={(d) => {
                    handleStatusChange(d);
                  }}
                  value={data?.status}
                  fields={(i) => i?.name}
                />
              </Label>
            </div>
          </FilterTable>
        </SubNavChild>
      </SubNavBar>

      <div className="p-6 flex gap-6 flex-col">
        <div className="flex gap-2 items-center justify-between ">
          <Button
            text="Add Client"
            icon={<FaPlus />}
            type="button"
            onClick={() => {
              navigate("/clients/add");
            }}
          />
        </div>

        <div className="p-2 rounded-md border border-slate-200 bg-white">
          <Table
            loading={loading}
            Columns={Columns}
            data={users}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
    </>
  );
};

export default Client;
