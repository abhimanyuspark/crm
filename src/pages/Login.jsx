import React, { useState } from "react";
import {
  Button,
  formValidation,
  CheckBox,
  InputText,
} from "../components/index";
import { FaCheck, FaEye, FaEyeSlash } from "../components/icons";
import SVG from "../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUser } from "../redux/server/server";
import { togglePersist } from "../redux/features/reduxLogin";

const Login = () => {
  const { loading, persist } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/crm_project/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validError = formValidation(formData);
    const isValid = Object.keys(validError).length === 0;

    if (isValid) {
      const response = await dispatch(authenticateUser(formData));
      if (response?.meta?.requestStatus === "fulfilled") {
        navigate(from, { replace: true });
      } else {
        setErrors((p) => ({ ...p, ...response?.payload }));
      }
    } else {
      setErrors((p) => ({ ...p, ...validError }));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center border-b border-slate-300 h-[70px]">
        <div className="flex gap-4 items-center">
          <img src={SVG} alt="logo" />
          <h2 className="text-xl font-bold">CRM</h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-[calc(100vh-70px)] overflow-auto bg-slate-100">
        <div className="p-5 w-[450px] border border-slate-200 rounded-md flex flex-col gap-8 items-center bg-white">
          <h1 className="text-2xl font-bold">Log In</h1>
          <form onSubmit={onSubmit} className="flex gap-5 flex-col w-full">
            <InputText
              placeholder="Enter a email"
              label="Email"
              focus
              name="email"
              important
              error={errors?.email}
              value={formData.email}
              onChange={handleChange}
            />

            <InputText
              type={show ? "text" : "password"}
              placeholder="Enter a password"
              label="Password"
              important
              name="password"
              error={errors?.password}
              value={formData.password}
              onChange={handleChange}
              button={
                <button
                  onClick={() => {
                    setShow(!show);
                  }}
                  type="button"
                  className="px-2 text-slate-600 h-full border-r border-slate-300 flex items-center justify-center hover:bg-slate-200"
                >
                  {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
              }
            />

            <CheckBox
              label="Remember me"
              name="persist"
              checked={persist}
              onChange={(e) => {
                const value = e.target.checked;
                dispatch(togglePersist(value));
              }}
            />

            <Button
              height={"45px"}
              icon={<FaCheck size={20} />}
              loading={loading}
              text="Log In"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
