import NetIncomeGraph from "./NetIncomeGraph";
import NetIncomeTable from "./NetIncomeTable";

export default function NetIncome() {
  return (
    <div className="dashboard__section">
      <h3 className="dashboard__section-title">Net Income</h3>
      <div className="dashboard__section-inner-container">
        <div className="dashboard__net-table-outer-container">
          <NetIncomeTable />
        </div>
        <NetIncomeGraph />
      </div>
    </div>
  );
}
