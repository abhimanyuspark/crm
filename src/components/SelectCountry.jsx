import React from "react";
import Select from "./select/select";
import { useSelector } from "react-redux";

export const SelectCountry = ({ value = "", onChange }) => {
  const { country } = useSelector((state) => state.country);

  const Templete = (d) => {
    return (
      <div className="flex items-center gap-2">
        {d ? (
          <>
            <img
              loading="lazy"
              className="w-4 h-4"
              src={d?.flags?.svg}
              alt={`${d?.name}`}
            />
            <span>{d?.name?.common}</span>
          </>
        ) : (
          "--"
        )}
      </div>
    );
  };

  return (
    <Select
      emptylist
      value={value}
      options={country}
      search
      optionswidth="25rem"
      fields={(i) => i?.name?.common}
      onChange={onChange}
      optiontemplete={Templete}
      valuetemplete={Templete}
    />
  );
};

export const SelectCountryIDD = ({ value = "", onChange }) => {
  const { country } = useSelector((state) => state.country);

  const getData = (d) => {
    const root = d?.idd?.root ? String(d?.idd?.root) : "+0";
    const suffixes = d?.idd?.suffixes ? String(d?.idd?.suffixes) : "";
    const combined = root + suffixes.slice(0, 2);
    return combined;
  };

  const Templete = (d) => {
    const combined = getData(d);
    return (
      <div className="flex items-center gap-2">
        {d ? (
          <>
            <img
              loading="lazy"
              className="w-4 h-4"
              src={d?.flags?.svg}
              alt={`${d?.name}`}
            />
            <span>{combined}</span>
          </>
        ) : (
          "--"
        )}
      </div>
    );
  };

  return (
    <Select
      emptylist
      value={value}
      options={country}
      search
      width="10rem"
      fields={(i) => getData(i)}
      onChange={onChange}
      optiontemplete={Templete}
      valuetemplete={Templete}
    />
  );
};
