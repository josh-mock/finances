import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { fetchBalancesGraph } from "../../../api/dashboard";
import "chart.js/auto";

export default function BalancesGraph() {
  const { data: balancesGraph = [] } = useQuery({
    queryKey: ["balancesGraph"],
    queryFn: fetchBalancesGraph,
  });

  const chartData = {
    labels: balancesGraph.map((b) => b.account_name),
    datasets: [
      {
        label: "Balances",
        data: balancesGraph.map((b) => b.balance / 100),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // fill container height
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `£${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    layout: {
      padding: 0,
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
}
