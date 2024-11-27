import React, { useState, useEffect, useRef } from "react";

const InputText = ({
  value,
  type = "text",
  placeholder,
  onChange,
  icon,
  button,
  label,
  important,
  focus,
  width = "100%",
  height = "37px",
  error,
  name,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex gap-2 flex-col group/item">
      {label && (
        <label
          htmlFor={name}
          className="text-slate-500 text-sm cursor-pointer flex gap-1"
        >
          {label}
          {important && <sup className="text-red-500 text-base static">*</sup>}
        </label>
      )}

      <div
        style={{ width: width, height: height }}
        className={`flex items-center border rounded-[4px] overflow-hidden ${
          isFocused && !error
            ? "border-black"
            : error
            ? "border-red-500"
            : "border-slate-300 group-hover/item:border-black"
        }`}
      >
        {icon && (
          <div className="p-2 border-r border-slate-300 bg-slate-200 cursor-pointer flex items-center h-full">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className="w-full h-full outline-none p-2"
          onChange={onChange}
          autoFocus={focus}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...rest}
        />
        {button && (
          <div className="border-l border-slate-300 cursor-pointer h-full">
            {button}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

const TextArea = ({
  value,
  placeholder,
  onChange,
  label,
  important,
  width = "100%",
  rows = "3",
  error,
  name,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex gap-2 flex-col group/item">
      {label && (
        <label
          htmlFor={name}
          className="text-slate-500 text-sm cursor-pointer flex gap-1 "
        >
          {label}
          {important && <sup className="text-red-500 text-base static">*</sup>}
        </label>
      )}

      <div
        style={{ width: width }}
        className={`flex items-center border rounded-[4px] overflow-hidden ${
          isFocused && !error
            ? "border-black"
            : error
            ? "border-red-500"
            : "border-slate-300 group-hover/item:border-black"
        }`}
      >
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          rows={rows}
          className="w-full h-full outline-none p-2"
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...rest}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

const Label = ({ label, children, htmlFor = "" }) => {
  return (
    <div className={"flex gap-2 flex-col"}>
      <label
        htmlFor={htmlFor}
        className="text-slate-500 text-sm cursor-pointer"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

const CheckBox = ({
  label,
  indeterminate,
  disabled,
  onChange,
  checked,
  important,
  name,
  className,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id={name}
        ref={ref}
        checked={checked}
        // onChange={(e) => {
        //   onChange(e.target.checked);
        // }}
        onChange={onChange}
        disabled={disabled}
        className={className + "w-4 h-4 aspect-square"}
      />
      {label && (
        <label
          htmlFor={name}
          className="text-slate-600 text-sm cursor-pointer flex gap-1"
        >
          {label}
          {important && <sup className="text-red-500 text-base static">*</sup>}
        </label>
      )}
    </div>
  );
};

const Radio = ({
  id = "",
  name = "",
  label,
  value = true,
  checked,
  onChange = (e) => e,
}) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="radio"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        checked={checked}
        id={id}
        name={name}
        className="w-4 h-4"
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

const Switch = ({ icon1, icon2, value = true, onChange = (b) => b }) => {
  return (
    <div className="flex w-20 h-10 border border-black bg-white rounded-[4px] overflow-hidden cursor-pointer">
      <div
        onClick={() => {
          onChange(true);
        }}
        style={{ transition: "all 0.2s ease" }}
        className={`${
          value ? "bg-black text-white" : ""
        } w-full h-full hover:bg-black hover:text-white flex items-center justify-center`}
      >
        {icon1}
      </div>

      <div
        onClick={() => {
          onChange(false);
        }}
        style={{ transition: "all 0.2s ease" }}
        className={`${
          !value ? "bg-black text-white" : ""
        } w-full h-full hover:bg-black hover:text-white flex items-center justify-center`}
      >
        {icon2}
      </div>
    </div>
  );
};

const InputSelect = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border border-slate-300 p-2 rounded-[0.2rem]"
    >
      {children}
    </select>
  );
};

export { InputText, CheckBox, Radio, InputSelect, Switch, TextArea, Label };
