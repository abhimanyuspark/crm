import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CancelButton,
  CheckBox,
  Container,
  InputText,
  Loader,
  ReactDatePicker,
  Select,
  TextEditor,
  formValidation,
} from "../../../../components";
import { FaCheck } from "../../../../components/icons";
import { updateEvent, userDetails } from "../../../../redux/server/server";
import { updateEventReducer } from "../../../../redux/features/reduxLogin";
import { eventsData } from "../../../data.json";
import toast from "react-hot-toast";

const EditEvent = () => {
  const { userId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validate form before submit
    const error = formValidation(formData);
    const isValid = Object.keys(error).length === 0;

    if (isValid) {
      setFormLoading(true);
      try {
        await toast.promise(
          dispatch(
            updateEvent({
              userId: userId,
              eventId: id,
              updatedEvent: formData,
            })
          ),
          {
            loading: "Updating event...",
            success: <span>Event Updated Successfully</span>,
            error: <span>Failed to Update Event</span>,
          }
        );
        await dispatch(updateEventReducer(formData));
        navigate(-1, { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError((p) => ({ ...p, ...error }));
    }
    setFormLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(userDetails(userId));
      const data = response.payload;
      if (data) {
        let event = {};
        data?.events?.map((e) => {
          if (e?.id === id) {
            event = e;
          }
        });
        setFormData((p) => ({ ...p, ...event }));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <Container className="relative">
        <div className="border-b border-slate-300 p-4">
          <h2 className="text-xl font-bold">Update Event</h2>
        </div>

        {/* Event Form */}
        {loading && <Loader />}
        <form onSubmit={onSubmit}>
          <div className="p-4 flex gap-6 flex-col">
            <div className="grid grid-cols-2 gap-8">
              <InputText
                label="Title"
                name="title"
                important
                error={formError.title}
                value={formData?.title}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((p) => ({ ...p, [name]: value }));
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
                  value={new Date(formData?.start)}
                  onChange={(date) =>
                    setFormData((p) => ({ ...p, start: date }))
                  }
                  showTimeSelect={true}
                  dateFormat="YYYY-MM-dd h:mm:aa"
                />
              </div>
              {/* end Date */}
              <div className="flex gap-2 flex-col">
                <label className="text-base">End Date</label>
                <ReactDatePicker
                  value={new Date(formData?.end)}
                  onChange={(date) => setFormData((p) => ({ ...p, end: date }))}
                  showTimeSelect={true}
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
                  checked={formData?.allDay}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, allDay: e.target.checked }))
                  }
                />
              </div>
            </div>

            <div className="pb-4">
              <div className="flex gap-2 flex-col">
                <label className="text-base">Description</label>
                <TextEditor
                  value={formData?.description}
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

export default EditEvent;
