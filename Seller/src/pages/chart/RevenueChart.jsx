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

function AreaChart({ revenueReport }) {
  const labels = [];

  const getMonthName = (monthNumber) => {
    const date = new Date(2026, monthNumber - 1);
    return new Intl.DateTimeFormat("en-In", { month: "short" }).format(date);
  };

  revenueReport?.map((item) => {
    labels.push(getMonthName(item._id));
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueReport?.map((item) => item.totalPrice),
        fill: true,
        backgroundColor: "rgba(20, 93, 251,0.7)",
        borderColor: "rgba(20, 93, 251,1)",
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
