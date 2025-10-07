import BalancesGraph from "./BalancesGraph";
import BalancesTable from "./balancesTable";

export default function Balances() {
  return (
    <>
      <h3>Balances</h3>
      <BalancesTable />
      <BalancesGraph />
    </>
  );
}
