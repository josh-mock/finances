import TransactionsTable from "./TransactionsTable";
import AddTransaction from "./AddTransaction";

export default function Transactions() {
  return (
    <>
      <h2>Transactions</h2>
      <TransactionsTable />
      <AddTransaction />
    </>
  );
}
