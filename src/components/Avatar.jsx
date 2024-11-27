import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import { ImageLoader } from "./index";
import { SlCloudUpload } from "./icons";

const Avatar = ({ value = "", onChange }) => {
  const [loading, setLoading] = useState(false);

  const style = {
    transition: "all 0.3s ease",
  };

  return (
    <div
      className="relative w-full h-36 border border-slate-300 flex items-center justify-center rounded-md cursor-pointer overflow-hidden"
      onClick={() => {
        setLoading(true);
        const time = setTimeout(() => {
          const profile = faker.image.avatar();
          onChange(profile);
          setLoading(false);
        }, 500);
        return () => clearTimeout(time);
      }}
    >
      {loading ? (
        <ImageLoader />
      ) : value ? (
        <div className="group/show relative w-full h-full flex items-center justify-center">
          <div
            style={style}
            className="group-hover/show:opacity-100 group-hover/show:bg-[rgba(0,0,0,0.5)] opacity-0 absolute z-10 w-full h-full flex flex-col justify-between"
          >
            <div className="flex justify-end items-start p-2">
              <button
                type="button"
                className="border border-white p-2 text-sm bg bg-[rgba(0,0,0,0.8)] text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
              >
                Remove
              </button>
            </div>
            <p
              style={style}
              className="flex items-center justify-center group-hover/show:-translate-y-10 text-xs text-white"
            >
              Drop a file or Click to replace it
            </p>
          </div>
          <img
            src={value}
            loading="lazy"
            alt="Avatar"
            onLoadStart={() => setLoading(false)}
            onLoad={() => setLoading(false)}
            className="w-auto h-full rounded-md p-2 object-cover"
          />
        </div>
      ) : (
        <div className="avatar w-full h-full flex flex-col gap-2 items-center justify-center text-slate-400">
          <SlCloudUpload size={40} />
          <span className="text-sm">Choose a file</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
