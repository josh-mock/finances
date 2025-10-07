import { useQuery } from "@tanstack/react-query";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { fetchBalancesGraph } from "../../../api/dashboard";

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
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `£${context.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
}
