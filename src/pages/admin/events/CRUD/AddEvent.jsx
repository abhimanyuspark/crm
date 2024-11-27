import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CancelButton,
  CheckBox,
  Container,
  InputText,
  ReactDatePicker,
  Select,
  TextEditor,
} from "../../../../components";
import { FaCheck, FaTimes } from "../../../../components/icons";
import { addEventToUser, roleUsers } from "../../../../redux/server/server";
import { addEventReducer } from "../../../../redux/features/reduxLogin";
import { FlConverter } from "../../../../utilities";
import { v4 as uuid } from "uuid";
import { eventsData } from "../../../data.json";
import toast from "react-hot-toast";

const AddEvent = () => {
  const { user } = useSelector((state) => state.auth);
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = users?.filter((i) => i.role?.includes("employee"));
  const clients = users?.filter((i) => i.role?.includes("client"));
  const [employee, setEmployee] = useState(user);
  const [client, setClient] = useState("");

  const [formData, setFormData] = useState({
    id: uuid(),
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    allDay: false,
    status: eventsData[0],
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState({
    title: "",
    employee: "",
    client: "",
  });

  const validate = (formData) => {
    const err = {};
    ["title"].forEach((f) => {
      if (!formData[f] || !formData[f].trim()) {
        err[f] = `${FlConverter(f)} field is required.`;
      }
    });

    if (!employee && !client) {
      err.employee = "Employee field is required.";
      err.client = "Client field is required.";
    }

    setFormError(err);
    return !Object.keys(err).length;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validate form before submit
    if (validate(formData)) {
      setFormLoading(true);
      try {
        await toast.promise(
          dispatch(
            addEventToUser({
              userId: employee?.id || client?.id,
              event: formData,
            })
          ),
          {
            loading: "Adding event...",
            success: <span>Event Added Successfully</span>,
            error: <span>Failed to Add Event</span>,
          }
        );
        if (user?.id === employee?.id) {
          await dispatch(addEventReducer(formData));
        }
        navigate(-1, { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
    setFormLoading(false);
  };

  useEffect(() => {
    dispatch(roleUsers(""));
  }, []);

  const Template = (e) => {
    return (
      <div className="flex items-center gap-3 px-2">
        {e && <img src={e?.profile} className="w-6 h-6" />}

        {e ? e?.name : "--"}
        {e?.role?.includes("admin") && (
          <span className="text-xs py-[2px] px-1 rounded-sm bg-slate-500 text-white">
            its you
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <Container>
        <div className="border-b border-slate-300 p-4">
          <h2 className="text-xl font-bold">Add Event</h2>
        </div>

        {/* Event Form */}

        <form onSubmit={onSubmit}>
          <div className="p-4 flex gap-6 flex-col">
            <div className="grid grid-cols-2 gap-8">
              <InputText
                label="Title"
                name="title"
                important
                focus={true}
                error={formError.title}
                value={formData.title}
                placeholder="Enter a event title..."
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({ ...formData, [name]: value });
                  setFormError((p) => ({ ...p, [name]: "" }));
                }}
              />
              {/* Status */}
              <div className="flex gap-2 flex-col">
                <label className="text-base">Status</label>
                <Select
                  options={eventsData}
                  value={formData.status}
                  fields={(i) => i?.name}
                  onChange={(status) => {
                    setFormData((p) => ({ ...p, status: status }));
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* start date */}
              <div className="flex gap-2 flex-col">
                <label className="text-base">Start Date</label>
                <ReactDatePicker
                  value={new Date(formData.start)}
                  onChange={(date) =>
                    setFormData((p) => ({ ...p, start: date }))
                  }
                  {...{ showTimeSelect: true }}
                  dateFormat="YYYY-MM-dd h:mm:aa"
                />
              </div>
              {/* end Date */}
              <div className="flex gap-2 flex-col">
                <label className="text-base">End Date</label>
                <ReactDatePicker
                  value={new Date(formData.end)}
                  onChange={(date) => setFormData((p) => ({ ...p, end: date }))}
                  {...{ showTimeSelect: true }}
                  dateFormat="YYYY-MM-dd h:mm:aa"
                />
              </div>
            </div>

            {/*  time zone */}
            <div className="grid grid-cols-1 gap-8">
              <div className="flex gap-2 flex-col">
                <label>All Day</label>
                <CheckBox
                  className="w-5"
                  checked={formData.allDay}
                  onChange={() =>
                    setFormData((p) => ({ ...p, allDay: !formData.allDay }))
                  }
                />
              </div>
            </div>

            {formError.employee && formError.client && (
              <div className="border border-red-500 rounded-[4px] p-3 text-red-500 bg-red-100 flex justify-between items-center">
                <p className="text-sm">
                  You have to select either client or employee.
                </p>

                <FaTimes
                  className="cursor-pointer"
                  onClick={() => {
                    setFormError((prev) => ({
                      ...prev,
                      client: "",
                      employee: "",
                    }));
                  }}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-8">
              <div className="flex gap-2 flex-col">
                <label className="text-base">Employees</label>
                <Select
                  search
                  className={formError.employee && "border-red-500"}
                  loading={loading}
                  value={employee}
                  options={employees}
                  fields={(i) => i.name}
                  onChange={(e) => {
                    setEmployee(e);
                    setClient("");
                    setFormError((prev) => ({
                      ...prev,
                      employee: "",
                      client: "",
                    }));
                  }}
                  optiontemplete={Template}
                  valuetemplete={Template}
                />
                {formError.employee && (
                  <p className="text-red-500 text-base">{formError.employee}</p>
                )}
              </div>

              <div className="flex gap-2 flex-col">
                <label className="text-base">Clients</label>
                <Select
                  search
                  className={formError.client && "border-red-500"}
                  value={client}
                  loading={loading}
                  options={clients}
                  onChange={(e) => {
                    setClient(e);
                    setEmployee("");
                    setFormError((prev) => ({
                      ...prev,
                      employee: "",
                      client: "",
                    }));
                  }}
                  fields={(i) => i.name}
                  optiontemplete={Template}
                  valuetemplete={Template}
                  emptylist
                />
                {formError.client && (
                  <p className="text-red-500 text-base">{formError.client}</p>
                )}
              </div>
            </div>

            <div className="pb-4">
              <div className="flex gap-2 flex-col">
                <label className="text-base">Description</label>
                <TextEditor
                  value={formData.description}
                  onChange={(data) =>
                    setFormData((p) => ({ ...p, description: data }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-300 p-4 flex gap-4">
            <Button
              text="Submit"
              icon={<FaCheck />}
              type="submit"
              loading={formLoading}
            />
            <CancelButton
              type="button"
              text="Cancel"
              onClick={() => navigate(-1, { replace: true })}
            />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddEvent;
