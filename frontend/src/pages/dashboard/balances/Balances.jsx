import BalancesTable from "./balancesTable";
import BalancesGraph from "./BalancesGraph";

export default function Balances() {
  return (
    <>
      <h3 className="dashboard__section-title">Balances</h3>
      <div className="dashboard__section">
        <BalancesTable />
        <BalancesGraph />
      </div>
    </>
  );
}
