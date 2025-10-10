import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart } from "chart.js";
import { fetchUkInterestTable } from "../../../api/dashboard";

Chart.register(annotationPlugin);

export default function UkInterestGraph() {
  const { data: ukInterestTable = [] } = useQuery({
    queryKey: ["ukInterestTable"],
    queryFn: fetchUkInterestTable,
  });

  if (!ukInterestTable.length)
    return <div className="table__empty">No data.</div>;

  const filteredData = ukInterestTable.filter(
    (row) => row.account_name !== "Total"
  );

  const data = {
    labels: ["Total Interest by Account"],
    datasets: filteredData.map((row, i) => ({
      label: row.account_name,
      data: [Number(row.total_interest) / 100],
      backgroundColor: [
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(54, 162, 235, 0.7)",
      ][i % 4],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (tooltipItem) => `£${tooltipItem.raw.toLocaleString()}`,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 1000,
            yMax: 1000,
            borderColor: "rgba(255, 99, 132, 0.8)",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              enabled: true,
              content: "£1000 threshold",
              position: "center",
              backgroundColor: "rgba(255, 99, 132, 0.8)",
              color: "#fff",
            },
          },
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (value) => `£${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
