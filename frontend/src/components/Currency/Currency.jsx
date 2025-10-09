import formatCurrency from "../../lib/formatCurrency";
import styles from "./currency.module.css";

export default function Currency({ value, symbol = "£", roundUp = false }) {
  console.log(styles);
  return (
    <div className={styles.currency}>
      <span>{symbol}</span>
      <span className={styles.currency__value}>
        {formatCurrency(value, roundUp)}
      </span>
    </div>
  );
}
