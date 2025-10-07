import { useQuery } from "@tanstack/react-query";
import "chart.js/auto";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

import { fetchBudgetTable } from "../../../api/dashboard";

export default function BudgetGraph() {
  const { data: budgetTable = [] } = useQuery({
    queryKey: ["budgetTable"],
    queryFn: fetchBudgetTable,
  });

  const [mode, setMode] = useState("values");

  const rows = budgetTable.map((b) => ({
    label: b.category,
    budget: (b.budgeted_amount ?? 0) / 100,
    spent: (b.spent_this_month ?? 0) / 100,
  }));

  const chartData = (() => {
    if (mode === "values") {
      return {
        labels: rows.map((r) => r.label),
        datasets: [
          {
            label: "Budgeted",
            data: rows.map((r) => r.budget),
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            stack: "budget",
          },
          {
            label: "Spent",
            data: rows.map((r) => r.spent),
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            stack: "budget",
          },
        ],
      };
    }

    const percentRows = rows.map((r) => {
      const total = r.budget === 0 ? 0 : r.budget;
      const spentPct = total === 0 ? 0 : (r.spent / total) * 100;
      const remainPct = total === 0 ? 0 : 100 - spentPct;
      return { ...r, spentPct, remainPct };
    });

    return {
      labels: percentRows.map((r) => r.label),
      datasets: [
        {
          label: "Spent",
          data: percentRows.map((r) => r.spentPct),
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          stack: "percent",
        },
        {
          label: "Remaining",
          data: percentRows.map((r) => r.remainPct),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          stack: "percent",
        },
      ],
    };
  })();

  const chartOptions = (() => {
    const base = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y ?? context.raw;
              if (mode === "values") {
                return `${context.dataset.label}: £${value.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`;
              }
              return `${context.dataset.label}: ${value.toFixed(1)} %`;
            },
          },
        },
        legend: { position: "top" },
      },
    };

    if (mode === "values") {
      return {
        ...base,
        scales: {
          x: {
            stacked: true,
            title: { display: true, text: "Category" },
          },
          y: {
            stacked: true,
            title: { display: true, text: "Amount (£)" },
            ticks: {
              callback: (v) =>
                `£${Number(v).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
            },
          },
        },
      };
    }

    return {
      ...base,
      scales: {
        x: {
          stacked: true,
          title: { display: true, text: "Category" },
        },
        y: {
          stacked: true,
          min: 0,
          max: 100,
          title: { display: true, text: "Share of Budget (%)" },
          ticks: {
            callback: (v) => `${v}%`,
          },
        },
      },
    };
  })();

  return (
    <div>
      <label>View:</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="form__select"
      >
        <option value="values">Values (£)</option>
        <option value="percent">% of Budget</option>
      </select>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
