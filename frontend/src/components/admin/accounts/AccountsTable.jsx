import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditAccountModal from "./EditAccountModal";
import DeleteAccountButton from "./DeleteAccountButton";
import { fetchAccounts } from "../../../api/accounts";

export default function AccountsTable() {
  const { data: accounts = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
  const [editingAccount, setEditingAccount] = useState(null);

  if (accounts.length === 0) {
    return <div className="table__empty">No accounts</div>;
  }

  return (
    <div className="accounts-table">
      <table className="table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Type</th>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Status</th>
            <th>Year Opened</th>
            <th>Year Closed</th>
            <th>Actions</th>
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
              <td className="table__actions">
                <button
                  className="table__button"
                  onClick={() => setEditingAccount(account)}
                >
                  Edit
                </button>
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
