import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
const chart = [
  { label: "inprocess", value: 0, color: "blue" },
  { label: "pending", value: 0, color: "yellow" },
  { label: "notstarted", value: 0, color: "gray" },
  { label: "canceled", value: 0, color: "red" },
  { label: "finished", value: 0, color: "green" },
];

const PieChartUsage = ({ data, label, chartjs = chart }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const getLabels = [];
    const getValues = [];
    const getColors = [];

    for (let j = 0; j < chartjs?.length; j++) {
      getLabels.push(chartjs[j].label);
      getColors.push(chartjs[j].color);
      let count = 0; // Initialize count for each label
      for (let i = 0; i < data?.length; i++) {
        if (data[i]?.status?.name === chartjs[j].label) {
          count++; // Increment count if status matches
        }
      }
      getValues.push(count);
    }

    setLabels(getLabels);
    setColors(getColors);
    setValues(getValues);
  }, [data]);

  return (
    <PieChart values={values} labels={labels} colors={colors} label={label} />
  );
};

export default PieChartUsage;
