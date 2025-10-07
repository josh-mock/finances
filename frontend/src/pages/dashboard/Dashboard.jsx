import Balances from "./balances/Balances";
import NetIncome from "./netIncome/NetIncome";
import Budget from "./Budget/Budget";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Balances />
      <NetIncome />
      <Budget />
    </div>
  );
}
