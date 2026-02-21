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
  const { sallers } = useSelector((state) => state.monthlyReport);

  const labels = [];

  const getMonthName = (monthNumber) => {
    const date = new Date(2026, monthNumber - 1);
    return new Intl.DateTimeFormat("en-In", { month: "short" }).format(date);
  };

  sallers.map((item) => {
    labels.push(getMonthName(item._id));
  });

  console.log(labels)

  const data = {
    labels,
    datasets: [
      {
        label: "Sallers",
        data: sallers.map(item=>item.totalSeller),
        borderColor: "rgb(165, 96, 0)",
        backgroundColor: "rgba(165, 96, 0,0.6)",
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
