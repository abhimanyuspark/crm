import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CancelButton,
  Container,
  InputText,
  Select,
  Avatar,
  formValidation,
  Radio,
  TextArea,
  Label,
  TextEditor,
  SelectCountry,
  SelectCountryIDD,
  Loader,
} from "../../../../components";
import {
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaRandom,
} from "../../../../components/icons";
import { toast } from "react-hot-toast";
import { useRandomPassword } from "../../../../hooks";
import { editUser, userDetails } from "../../../../redux/server/server";
import { genders, ClientsData, employeeData } from "../../../data.json";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData } = ClientsData;
  const { jobType } = employeeData;

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profile: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    country: "",
    age: "",
    visits: "",
    jobType: "",
    date: new Date(),
    login: "Yes",
    status: {},
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
    officeWebsite: "",
    phoneNumber: "",
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
          loading: "Updating employee...",
          success: "Updated successfully",
          error: `Failed to update employee: ${error.message}`,
        });
        navigate(-1, { replace: true });
        setFormLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError((p) => ({ ...p, ...error }));
    }
  };

  const Status = (i) => {
    return (
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: i?.color }}
        ></span>
        <span>{i?.name}</span>
      </div>
    );
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
            setFormError((p) => ({ ...p, password: "" }));
          }}
        >
          <FaRandom />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(userDetails(id));
      const data = response.payload;
      if (data) {
        setFormData((p) => ({ ...p, ...data }));
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="p-6">
      <Container>
        <div className="border-b border-slate-300 p-4">
          <h2 className="text-xl font-bold">Update Employee</h2>
        </div>

        {/* Event Form */}
        {loading && <Loader />}
        <form onSubmit={onSubmit}>
          <div>
            {/* Employee Details */}
            <div className="p-4 grid gap-6">
              <div className="grid lg:grid-cols-[1fr_245px] lg:gap-6 gap-4">
                {/* Name, Email, Password, Gender and  Updated At Fields */}
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
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

                  <Label label="Gender">
                    <Select
                      options={genders}
                      value={formData.gender}
                      onChange={(data) => {
                        setFormData((p) => ({ ...p, gender: data }));
                      }}
                      fields={(i) => i}
                    />
                  </Label>

                  <Label label="Country">
                    <SelectCountry
                      value={formData.country}
                      onChange={(d) => {
                        setFormData((p) => ({
                          ...p,
                          country: d,
                          countryCode: d,
                        }));
                      }}
                    />
                  </Label>

                  <Label label="Phone no" htmlFor="phone">
                    <div className="flex">
                      <SelectCountryIDD
                        value={formData.countryCode}
                        onChange={(d) => {
                          setFormData((p) => ({ ...p, countryCode: d }));
                        }}
                      />
                      <InputText
                        type="tel"
                        name="phone"
                        error={formError.phoneNumber}
                        value={formData.phoneNumber}
                        onChange={(d) => {
                          setFormData((p) => ({
                            ...p,
                            phoneNumber: d.target.value,
                          }));
                          setFormError((p) => ({ ...p, phoneNumber: "" }));
                        }}
                      />
                    </div>
                  </Label>
                </div>

                {/* Profile Picture */}
                <Label label={"Profile Picture"}>
                  <Avatar
                    value={formData.profile}
                    onChange={(data) => {
                      setFormData((p) => ({ ...p, profile: data }));
                    }}
                  />
                </Label>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {/* JobType */}
                <Label label="Job Type">
                  <Select
                    emptylist
                    options={jobType}
                    value={formData.jobType}
                    onChange={(data) => {
                      setFormData((p) => ({ ...p, jobType: data }));
                    }}
                    fields={(i) => i}
                  />
                </Label>
                {/* age */}
                <InputText
                  type="number"
                  label="Age"
                  value={formData.age}
                  name="age"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {/* status */}
                <Label label="Status">
                  <Select
                    options={formData.statusMenu}
                    value={formData.status}
                    onChange={(data) => {
                      setFormData((p) => ({ ...p, status: data }));
                    }}
                    optiontemplete={Status}
                    valuetemplete={Status}
                    fields={(i) => i.name}
                  />
                </Label>
              </div>

              {/* Login Allowed */}
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
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, login: e }));
                      }}
                    />
                  ))}
                </div>
              </Label>
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

export default EditEmployee;
