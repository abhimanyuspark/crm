import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CancelButton,
  Container,
  InputText,
  Select,
  Avatar,
  ReactDatePicker,
  formValidation,
  Loader,
  Radio,
  TextArea,
  Label,
  TextEditor,
  SelectCountry,
  SelectCountryIDD,
} from "../../../../components";
import {
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaRandom,
} from "../../../../components/icons";
import { toast } from "react-hot-toast";
import { editUser, userDetails } from "../../../../redux/server/server";
import { useRandomPassword } from "../../../../hooks";
import { genders, ClientsData } from "../../../data.json";

const EditClient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData } = ClientsData;

  const FollowUp = [
    {
      type: "Yes",
    },
    {
      type: "No",
    },
  ];

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profile: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    country: "",
    age: "",
    status: {},
    gender: "",
    login: "",
    allowFollowUp: {},
    company: "",
    officeWebsite: "",
    officePhone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    note: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    password: "",
    email: "",
    officeWebsite: "",
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
          loading: "Updating client...",
          success: "Updated successfully",
          error: `Failed to update client: ${error.message}`,
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
      <Container className="w-full h-full">
        <div className="border-b border-slate-300 p-4">
          <h2 className="text-xl font-bold">Update Client</h2>
        </div>

        {/* Event Form */}
        {loading && <Loader />}
        <form onSubmit={onSubmit}>
          <div>
            {/* Client Details */}
            <div className="p-4 grid gap-6">
              <div className="grid lg:grid-cols-[1fr_180px] lg:gap-6 gap-4">
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
                        value={formData.phoneNumber}
                        onChange={(d) => {
                          setFormData((p) => ({
                            ...p,
                            phoneNumber: d.target.value,
                          }));
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

              <div className="grid grid-cols-3 gap-8">
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
                {/* Follow Up */}
                <Label label="Follow up">
                  <Select
                    options={FollowUp}
                    value={formData.allowFollowUp}
                    onChange={(data) => {
                      setFormData((p) => ({ ...p, allowFollowUp: data }));
                    }}
                    fields={(i) => i.type}
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

            {/* Company Details */}
            <div>
              <div className="border-t border-slate-300 p-4">
                <h2 className="text-xl">Company Details</h2>
              </div>

              <div className="p-4 grid gap-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Company Name */}
                  <InputText
                    label="Company Name"
                    name="company"
                    placeholder="Enter a company name"
                    value={formData.company}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />

                  {/* Phone No */}
                  <InputText
                    type="tel"
                    label="Office Phone No"
                    name="officePhone"
                    placeholder="Enter a phone no"
                    value={formData.officePhone}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />

                  {/* Website */}
                  <InputText
                    label="Office Website"
                    name="officeWebsite"
                    placeholder="Enter a website url"
                    error={formError.officeWebsite}
                    value={formData.officeWebsite}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />

                  {/* city */}
                  <InputText
                    label="City"
                    name="city"
                    placeholder="Enter a city name"
                    value={formData.city}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />

                  {/* state */}
                  <InputText
                    label="State"
                    name="state"
                    placeholder="Enter a state"
                    value={formData.state}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />

                  {/* Postal Code */}
                  <InputText
                    label="Postal Code"
                    name="postalCode"
                    placeholder="Enter a postalCode"
                    value={formData.postalCode}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </div>

                {/* Address */}
                <TextArea
                  type="text"
                  label="Address"
                  placeholder="Enter a address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />

                <Label label={"Note"}>
                  <TextEditor
                    value={formData.note}
                    onChange={(d) => {
                      setFormData((p) => ({ ...p, note: d }));
                    }}
                  />
                </Label>
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

export default EditClient;
