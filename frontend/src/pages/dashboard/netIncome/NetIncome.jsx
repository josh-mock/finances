import NetIncomeGraph from "./NetIncomeGraph";
import NetIncomeTable from "./NetIncomeTable";

export default function NetIncome() {
  return (
    <div>
      <h3>Net Income</h3>
      <div>
        <NetIncomeTable />
        <NetIncomeGraph />
      </div>
    </div>
  );
}
