import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditBankModal from "./EditBankModal";
import DeleteBankButton from "./DeleteBankButton";
import { fetchBanks } from "../../../api/banks";

export default function BanksTable() {
  const { data: banks = [] } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
  });
  const [editingBank, setEditingBank] = useState(null);

  if (banks.length === 0) {
    return <div className="table__empty">No banks</div>;
  }

  return (
    <div className="banks-table">
      <table className="table">
        <thead>
          <tr>
            <th>Legal Name</th>
            <th>Display Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banks
            .sort((a, b) => a.legal_name.localeCompare(b.legal_name))
            .map((bank) => (
              <tr key={bank.id}>
                <td>{bank.legal_name}</td>
                <td>{bank.display_name}</td>
                <td>{bank.address}</td>
                <td>
                  <button
                    className="table__button"
                    onClick={() => setEditingBank(bank)}
                  >
                    Edit
                  </button>
                  <DeleteBankButton id={bank.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingBank && (
        <EditBankModal
          bank={editingBank}
          onClose={() => setEditingBank(null)}
        />
      )}
    </div>
  );
}
