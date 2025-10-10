import BudgetGraph from "./BudgetGraph";
import BudgetTable from "./BudgetTable";

export default function Budget() {
  return (
    <div className="dashboard__section">
      <h3 className="dashboard__section-title">Budget</h3>
      <div className="budget">
        <div className="budget__table">
          <BudgetTable />
        </div>
        <div className="budget__graph">
          <BudgetGraph />
        </div>
      </div>
    </div>
  );
}
