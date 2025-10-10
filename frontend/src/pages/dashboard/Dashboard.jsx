import Balances from "./balances/Balances";
import Budget from "./Budget/Budget";
import NetIncome from "./netIncome/NetIncome";
import UkInterest from "./UkInterest/UkInterest";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Balances />
      <NetIncome />
      <Budget />
      <UkInterest />
    </div>
  );
}
