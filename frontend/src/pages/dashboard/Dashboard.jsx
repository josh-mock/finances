import Balances from "./balances/Balances";

export default function Dashboard() {
  return (
    <div className="dashboard__container">
      <h2 className="dashboard__title">Dashboard</h2>
      <Balances />
    </div>
  );
}
