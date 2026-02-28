import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

function AreaChart({ productReport }) {
  const labels = [];

  const getMonthName = (monthNumber) => {
    const date = new Date(2026, monthNumber - 1);
    return Intl.DateTimeFormat("en-In", { month: "short" }).format(date);
  };

  productReport?.map((prod) => {
    labels.push(getMonthName(prod._id));
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Products",
        data: productReport?.map((item) => item.totalProduct),
        fill: true,
        backgroundColor: "rgba(152, 16, 250,0.7)",
        borderColor: "rgba(152, 16, 250,1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default AreaChart;
