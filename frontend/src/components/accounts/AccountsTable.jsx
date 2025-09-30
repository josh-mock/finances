import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import EditAccountModal from "./EditAccountModal";
import DeleteAccountButton from "./DeleteAccountButton";
import { fetchAccounts } from "../../api/accounts";

export default function AccountsTable() {
  const { data: accounts = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
  const [editingAccount, setEditingAccount] = useState(null);

  if (accounts.length === 0) {
    return <div>No accounts</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Type</th>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Year Opened</th>
            <th>Status</th>
            <th>Year Closed</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.account_name}</td>
              <td>{account.account_type}</td>
              <td>{account.bank_name}</td>
              <td>{account.account_number}</td>
              <td>{account.is_closed ? "Closed" : "Open"}</td>
              <td>{account.year_opened}</td>
              <td>{account.year_closed}</td>
              <td>
                <button onClick={() => setEditingAccount(account)}>Edit</button>
                <DeleteAccountButton id={account.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAccount && (
        <EditAccountModal
          account={editingAccount}
          onClose={() => setEditingAccount(null)}
        />
      )}
    </div>
  );
}
