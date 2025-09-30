import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditBankModal from "./EditBankModal";
import DeleteBankButton from "./DeleteBankButton";
import { fetchBanks } from "../../api/banks";

function BanksList() {
  const { data: banks = [] } = useQuery({ queryKey: ["banks"], queryFn: fetchBanks });
  const [editingBank, setEditingBank] = useState(null);

  return (
    <div>
      {banks.map((bank) => (
        <div key={bank.id}>
          <span>{bank.legal_name},</span>
          <span>{bank.display_name},</span>
          <span>{bank.address}</span>
          <button onClick={() => setEditingBank(bank)}>Edit</button>
          <DeleteBankButton id={bank.id} />
        </div>
      ))}

      {editingBank && (
        <EditBankModal
          bank={editingBank}
          onClose={() => setEditingBank(null)}
        />
      )}
    </div>
  );
}

export default BanksList;
