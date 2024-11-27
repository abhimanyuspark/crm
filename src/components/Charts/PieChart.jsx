import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({
  values = [],
  labels = [],
  colors = [],
  label = "Data",
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
        text: "Chart.js Pie Chart",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
