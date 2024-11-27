import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CancelButton,
  Container,
  InputText,
  Select,
  Avatar,
  formValidation,
  Radio,
  Label,
  SelectCountry,
  SelectCountryIDD,
} from "../../../../components";
import { FaEye, FaEyeSlash, FaCheck, FaRandom } from "../../../../components/icons";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useRandomPassword } from "../../../../hooks";
import { addUser } from "../../../../redux/server/server";
import { genders, ClientsData, employeeData } from "../../../data.json";

const AddEmployee = ({ intialImage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData } = ClientsData;
  const { jobType } = employeeData;

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    role: ["employee"],
    name: "",
    password: "",
    profile: intialImage || "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    country: "",
    age: "",
    visits: "",
    jobType: "",
    date: new Date(),
    login: "Yes",
    status: {
      name: "Active",
      color: "#0cf90c",
      id: uuidv4(),
    },
    statusMenu: [
      { name: "Inactive", color: "red", id: uuidv4() },
      { name: "Active", color: "#0cf90c", id: uuidv4() },
    ],
    gender: "Male",
    tasks: [],
    projects: [],
    events: [],
    note: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormError((prev) => ({ ...prev, [key]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = formValidation(formData);
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      setFormLoading(true);
      try {
        await toast.promise(dispatch(addUser(formData)), {
          loading: "Saving Employee...",
          success: "Employee Added Successfully",
          error: "Failed to Add Employee",
        });
        navigate(-1, { replace: true });
      } catch (error) {
        console.error("Error adding employee:", error);
      } finally {
        setFormLoading(false);
      }
    } else {
      setFormError(errors);
    }
  };

  const Status = (i) => (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full" style={{ background: i?.color }}></span>
      <span>{i?.name}</span>
    </div>
  );

  const PasswordComponent = () => (
    <div className="flex w-full h-full text-slate-600">
      <div
        className="px-2 h-full border-r border-slate-300 flex items-center justify-center hover:bg-slate-200"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
      </div>
      <div
        className="px-2 h-full flex items-center justify-center hover:bg-slate-200"
        onClick={() => {
          const password = useRandomPassword(10);
          updateFormData("password", password);
        }}
      >
        <FaRandom />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <Container>
        <div className="border-b border-slate-300 p-4">
          <h2 className="text-xl font-bold">Add Employee</h2>
        </div>

        <form onSubmit={onSubmit}>
          <div className="p-4 grid gap-6">
            <div className="grid lg:grid-cols-[1fr_245px] lg:gap-6 gap-4">
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
                <InputText
                  label="Name"
                  name="name"
                  important
                  error={formError.name}
                  value={formData.name}
                  placeholder="Enter a name"
                  onChange={(e) => updateFormData("name", e.target.value)}
                />

                <InputText
                  label="Email"
                  name="email"
                  type="text"
                  important
                  error={formError.email}
                  value={formData.email}
                  placeholder="Enter an email"
                  onChange={(e) => updateFormData("email", e.target.value)}
                />

                <InputText
                  label="Password"
                  name="password"
                  important
                  type={show ? "text" : "password"}
                  error={formError.password}
                  value={formData.password}
                  placeholder="Enter a password"
                  onChange={(e) => updateFormData("password", e.target.value)}
                  button={<PasswordComponent />}
                />

                <Label label="Gender">
                  <Select
                    options={genders}
                    value={formData.gender}
                    onChange={(data) => updateFormData("gender", data)}
                    fields={(i) => i}
                  />
                </Label>

                <Label label="Country">
                  <SelectCountry
                    value={formData.country}
                    onChange={(d) =>
                      updateFormData("country", d)
                    }
                  />
                </Label>

                <Label label="Phone no" htmlFor="phone">
                  <div className="flex">
                    <SelectCountryIDD
                      value={formData.countryCode}
                      onChange={(d) =>
                        updateFormData("countryCode", d)
                      }
                    />
                    <InputText
                      type="tel"
                      name="phone"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        updateFormData("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                </Label>
              </div>

              <Label label="Profile Picture">
                <Avatar
                  value={formData.profile}
                  onChange={(data) =>
                    updateFormData("profile", data)
                  }
                />
              </Label>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Label label="Job Type">
                <Select
                  emptylist
                  options={jobType}
                  value={formData.jobType}
                  onChange={(data) =>
                    updateFormData("jobType", data)
                  }
                  fields={(i) => i}
                />
              </Label>

              <InputText
                type="number"
                label="Age"
                value={formData.age}
                name="age"
                onChange={(e) => updateFormData("age", e.target.value)}
              />

              <Label label="Status">
                <Select
                  options={formData.statusMenu}
                  value={formData.status}
                  onChange={(data) => updateFormData("status", data)}
                  optiontemplete={Status}
                  valuetemplete={Status}
                  fields={(i) => i.name}
                />
              </Label>
            </div>

            <Label label="Login Allowed">
              <div className="flex gap-6 items-center">
                {loginData?.map((d, i) => (
                  <Radio
                    id={d}
                    name="login"
                    label={d}
                    key={i}
                    value={d}
                    checked={formData.login === d}
                    onChange={(e) => updateFormData("login", e)}
                  />
                ))}
              </div>
            </Label>
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

export default AddEmployee;
