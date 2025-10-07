/* -------------------------------------------------------------
   BudgetGraph – toggle between “Values” and “% of Budget”
   ------------------------------------------------------------- */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import { fetchBudgetTable } from "../../../api/dashboard";

export default function BudgetGraph() {
  /* ---------------------------------------------------------
     1️⃣  Load the raw data once
     --------------------------------------------------------- */
  const { data: budgetTable = [] } = useQuery({
    queryKey: ["budgetTable"],
    queryFn: fetchBudgetTable,
  });

  /* ---------------------------------------------------------
     2️⃣  UI state – which representation the user wants
     --------------------------------------------------------- */
  const [mode, setMode] = useState("values");

  /* ---------------------------------------------------------
     3️⃣  Helper – turn the raw rows into a uniform shape
        (so we don’t repeat the mapping logic twice)
     --------------------------------------------------------- */
  const rows = budgetTable.map((b) => ({
    label: b.category, // X‑axis label
    budget: (b.budgeted_amount ?? 0) / 100, // £
    spent: (b.spent_this_month ?? 0) / 100, // £
  }));

  /* ---------------------------------------------------------
     4️⃣  Build **chartData** depending on the selected mode
     --------------------------------------------------------- */
  const chartData = (() => {
    if (mode === "values") {
      // ---- Values view (raw £) ---------------------------------
      return {
        labels: rows.map((r) => r.label),
        datasets: [
          {
            label: "Budgeted",
            data: rows.map((r) => r.budget),
            backgroundColor: "rgba(54, 162, 235, 0.7)", // blue
            stack: "budget",
          },
          {
            label: "Spent",
            data: rows.map((r) => r.spent),
            backgroundColor: "rgba(255, 99, 132, 0.7)", // red
            stack: "budget",
          },
        ],
      };
    }

    // ---- Percentage view (stacked 100 %) --------------------
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
          backgroundColor: "rgba(255, 99, 132, 0.7)", // red
          stack: "percent",
        },
        {
          label: "Remaining",
          data: percentRows.map((r) => r.remainPct),
          backgroundColor: "rgba(54, 162, 235, 0.7)", // blue
          stack: "percent",
        },
      ],
    };
  })();

  /* ---------------------------------------------------------
     5️⃣  Build **chartOptions** – they differ only in the Y‑axis
     --------------------------------------------------------- */
  const chartOptions = (() => {
    const base = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y ?? context.raw;
              if (mode === "values") {
                // raw £ formatting
                return `${context.dataset.label}: £${value.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`;
              }
              // percentage formatting
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
              // £ with commas
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

    // percentage mode
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

  /* ---------------------------------------------------------
     6️⃣  Render the toggle UI + the chart
     --------------------------------------------------------- */
  return (
    <div>
      {/* ----- Toggle --------------------------------------------------- */}
      <label>View:</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="form__select"
      >
        <option value="values">Values (£)</option>
        <option value="percent">% of Budget</option>
      </select>

      {/* ----- Chart ---------------------------------------------------- */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
