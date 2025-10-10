import { useQuery } from "@tanstack/react-query";
import "chart.js/auto";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchNetGraph } from "../../../api/dashboard";

export default function NetIncomeGraph() {
  const [period, setPeriod] = useState("day");

  const { data: netIncomeGraph = [] } = useQuery({
    queryKey: ["netIncomeGraph", period],
    queryFn: () => fetchNetGraph(period),
  });

  const formattedData = netIncomeGraph.map((n) => ({
    ...n,
    period: new Date(n.period).toISOString().split("T")[0].replace(/-/g, "/"),
  }));

  const chartData = {
    labels: formattedData.map((n) => n.period),
    datasets: [
      {
        label: "Cumulative Net Income",
        data: formattedData.map((n) => n.cumulative_net_income / 100),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `£${context.raw.toLocaleString()}`;
          },
        },
      },
      legend: { display: false },
    },
  };

  return (
    <div>
      <select value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
        <option value="month">Monthly</option>
        <option value="year">Yearly</option>
      </select>
      <div style={{ width: "750px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
