import BalancesGraph from "./BalancesGraph";
import BalancesTable from "./balancesTable";

export default function Balances() {
  return (
    <div className="dashboard__section">
      <h3 className="dashboard__section-title">Balances</h3>
      <div className="dashboard__section-inner-container">
        <div className="dashboard__table-outer-container">
          <BalancesTable />
        </div>
        <BalancesGraph />
      </div>
    </div>
  );
}
