import UkInterestGraph from "./UkInterestGraph";
import UkInterestTable from "./UkInterestTable";

export default function UkInterest() {
  return (
    <div>
      <h3>UK Interest</h3>
      <div>
        <UkInterestTable />
        <UkInterestGraph></UkInterestGraph>
      </div>
    </div>
  );
}
