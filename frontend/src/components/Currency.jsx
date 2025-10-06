import formatCurrency from "../lib/formatCurrency";

export default function Currency({ value }) {
  return (
    <div className="currency">
      <span className="currency__symbol">£</span>
      <span className="currency__value">{formatCurrency(value)}</span>
    </div>
  );
}
