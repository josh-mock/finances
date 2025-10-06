import BalancesTable from "./balancesTable";
import BalancesGraph from "./BalancesGraph";

export default function Balances() {
  return (
    <>
      <h3>Balances</h3>
      <div>
        <BalancesTable />
        <BalancesGraph />
      </div>
    </>
  );
}
