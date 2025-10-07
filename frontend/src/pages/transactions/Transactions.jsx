import AddTransaction from "./AddTransaction";
import TransactionsTable from "./TransactionsTable";

export default function Transactions() {
  return (
    <>
      <h2>Transactions</h2>
      <TransactionsTable />
      <AddTransaction />
    </>
  );
}
