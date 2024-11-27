import React, { useState } from "react";
import { useTheme } from "../../hooks";
import { FlConverter } from "../../utilities";

const AppTab = () => {
  // const [file, setFile] = useState("");

  // const handleFile = (file) => {
  //   const image = file[0];
  //   if (!image && (image.type !== "image/jpeg" || image.type !== "image/png"))
  //     return;
  //   setFile(URL.createObjectURL(image));
  //   console.log(image);
  // };

  return (
    <div className="p-3 flex gap-4 flex-col">
      <Theme />
      {/* 
      <div>
        <input
          type="file"
          onChange={(e) => {
            const value = e.target.files;
            handleFile(value);
          }}
        />
      </div>

      <img src={file} className="w-32 h-32" alt="Profile" /> */}
    </div>
  );
};

const Theme = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div>
      <p>Theme</p>
      <div className="flex gap-4 items-center">
        <p className="font-bold" style={{ color: theme ? "blue" : "red" }}>
          {FlConverter(JSON.stringify(theme))}
        </p>
        <button
          type="button"
          onClick={() => {
            toggleTheme();
          }}
          className="p-2 w-auto rounded-sm bg-blue-500 text-sm text-white cursor-pointer hover:bg-blue-600"
        >
          Toogle Theme
        </button>
      </div>
    </div>
  );
};

export default AppTab;
