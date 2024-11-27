import React from "react";
import SVG from "../assets/react.svg";
import { Button } from "../components";
import { FaLongArrowAltLeft } from "../components/icons";
import { useNavigate } from "react-router-dom";

const Not_Found = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center border-b border-slate-300 h-[70px]">
        <div className="flex gap-4 items-center">
          <img src={SVG} alt="logo" />
          <h2 className="text-xl font-bold">CRM</h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-[calc(100vh-70px)] overflow-auto bg-slate-100">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-bold">Oops Sorry!</h2>
          <p className="text-gray-600">Page not found.</p>
          <Button
            onClick={() => {
              navigate(-1, { replace: true });
            }}
            icon={<FaLongArrowAltLeft />}
            text={"Go back"}
          />
        </div>
      </div>
    </div>
  );
};

export default Not_Found;
