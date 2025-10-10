import UkInterestGraph from "./UkInterestGraph";
import UkInterestTable from "./UkInterestTable";

export default function UkInterest() {
  return (
    <div className="dashboard__section">
      <h3 className="dashboard__section-title">UK Interest</h3>
      <div className="dashboard__interest-container">
        <div>
          <UkInterestTable />
        </div>
        <div>
          <UkInterestGraph />
        </div>
      </div>
    </div>
  );
}
