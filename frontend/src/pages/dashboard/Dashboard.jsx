import Balances from "./balances/Balances";
import NetIncome from "./netIncome/NetIncome";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Balances />
      <NetIncome />
    </div>
  );
}
