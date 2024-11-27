import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
      <div className="loader"></div>
    </div>
  );
};

const ImageLoader = () => {
  return <div className="imageloader"></div>;
};

export { Loader, ImageLoader };
