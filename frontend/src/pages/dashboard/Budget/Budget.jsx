import BudgetGraph from "./BudgetGraph";
import BudgetTable from "./BudgetTable";

export default function Budget() {
  return (
    <>
      <h3>Budget</h3>
      <BudgetTable />
      <BudgetGraph />
    </>
  );
}
