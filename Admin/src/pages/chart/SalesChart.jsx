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
  const { sales } = useSelector((state) => state.monthlyReport);

  const labels = [];

  const getMonthName = (monthNumber) => {
    const date = new Date(2026, monthNumber - 1);
    return new Intl.DateTimeFormat("en-In", { month: "short" }).format(date);
  };

  sales.map((item) => {
    labels.push(getMonthName(item._id));
  });


  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: sales.map(item=>item.totalQtySale),
        borderColor: "rgb(0, 130, 54)",
        backgroundColor: "rgba(0, 130, 54,0.5)",
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
