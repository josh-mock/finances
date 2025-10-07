import formatCurrency from "../../lib/formatCurrency";
import styles from "./currency.module.css";

export default function Currency({ value }) {
  console.log(styles);
  return (
    <div className={styles.currency}>
      <span>£</span>
      <span className={styles.currency__value}>{formatCurrency(value)}</span>
    </div>
  );
}
