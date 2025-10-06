import NetIncomeTable from "./NetIncomeTable";
import NetIncomeGraph from "./NetIncomeGraph";

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
