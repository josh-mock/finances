import Balances from "./balances/Balances";
import Budget from "./Budget/Budget";
import NetIncome from "./netIncome/NetIncome";
import UkInterestTable from "./UkInterest/UkInterestTable";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Balances />
      <NetIncome />
      <Budget />
      <UkInterestTable />
    </div>
  );
}
