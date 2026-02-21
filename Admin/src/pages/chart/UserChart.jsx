import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
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
  Title,
  Tooltip,
  Legend,
);

function LineChart() {
  const { users } = useSelector((state) => state.monthlyReport);

  const labels = [];

  const getMonthName = (monthNumber) => {
    const date = new Date(2026, monthNumber - 1);
    return new Intl.DateTimeFormat("en-In", { month: "short" }).format(date);
  };

  users.map((user) => {
    labels.push(getMonthName(user._id));
  });

  console.log(labels)

  const data = {
    labels,
    datasets: [
      {
        label: "Users",
        data: users.map(user=>user.totalUser),
        borderColor: "rgb(152, 16, 250)",
        backgroundColor: "rgba(152, 16, 250,0.5)",
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
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
