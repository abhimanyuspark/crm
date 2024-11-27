import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CancelButton,
  InputText,
  Select,
  Avatar,
  formValidation,
} from "../../components";
import { FaEye, FaEyeSlash, FaCheck, FaRandom } from "../../components/icons";
import { toast } from "react-hot-toast";
import { useRandomPassword } from "../../hooks";
import { editUser } from "../../redux/server/server";
import { editAuthReducer } from "../../redux/features/reduxLogin";
import { genders, Marital_status } from "../data.json";

const ProfileTab = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profile: "",
    email: "",
    gender: "",
    marital_status: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setFormError((p) => ({ ...p, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = formValidation(formData);
    const isValid = Object.keys(error).length === 0;

    if (isValid) {
      setFormLoading(true);

      try {
        await toast.promise(dispatch(editUser(formData)), {
          loading: "Updating User...",
          success: <span>User Updated Successfully</span>,
          error: <span>Failed to updated a user</span>,
        });
        dispatch(editAuthReducer(formData));
        setFormLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError((p) => ({ ...p, ...error }));
    }
  };

  const PasswordComponent = () => {
    return (
      <div className="flex w-full h-full text-slate-600">
        <div
          className="px-2 h-full border-r border-slate-300 flex items-center justify-center hover:bg-slate-200"
          onClick={() => {
            setShow((p) => !p);
          }}
        >
          {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
        </div>
        <div
          className="px-2 h-full flex items-center justify-center hover:bg-slate-200"
          onClick={() => {
            const password = useRandomPassword(10);
            setFormData((p) => ({ ...p, password: password }));
            // setFormError((p) => ({ ...p, password: "" }));
          }}
        >
          <FaRandom />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  return (
    <form onSubmit={onSubmit}>
      <div className="p-6 grid gap-4">
        {/* Profile Picture */}
        <div className="flex gap-2 flex-col">
          <label className="text-base text-slate-600">Profile Picture</label>
          <Avatar
            value={formData.profile}
            onChange={(data) => {
              setFormData((p) => ({ ...p, profile: data }));
            }}
          />
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          <InputText
            label="Name"
            name="name"
            important
            error={formError.name}
            value={formData.name}
            placeholder="Enter a name"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />

          <InputText
            label="Email"
            name="email"
            type="text"
            important
            error={formError.email}
            value={formData.email}
            placeholder="Enter a email"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />

          <InputText
            label="Password"
            name="password"
            important
            type={show ? "text" : "password"}
            error={formError.password}
            value={formData.password}
            placeholder="Enter a password"
            onChange={(e) => {
              handleInputChange(e);
            }}
            button={<PasswordComponent />}
          />

          <div className="flex gap-2 flex-col">
            <label className="text-base text-slate-600">Gender</label>
            <Select
              options={genders}
              value={formData.gender}
              onChange={(g) => {
                setFormData((p) => ({ ...p, gender: g }));
              }}
              fields={(i) => i}
            />
          </div>

          <div className="flex gap-2 flex-col">
            <label className="text-base text-slate-600">Marital status</label>
            <Select
              options={Marital_status}
              value={formData?.marital_status}
              onChange={(m) => {
                setFormData((p) => ({ ...p, marital_status: m }));
              }}
              emptylist
              search
              fields={(i) => i.name}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300 p-4 flex gap-4">
        <Button
          text="Save"
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
  );
};

export default ProfileTab;
