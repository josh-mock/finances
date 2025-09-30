// EditBankModal.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateBank } from "../../api/banks";

function EditBankModal({ bank, onClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => updateBank(bank.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      onClose();
    },
  });

  const { register, handleSubmit, reset } = useForm({ defaultValues: bank });

  const onSubmit = (data) => mutation.mutate(data, { onSuccess: () => reset() });

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Bank</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Legal Name</label>
            <input {...register("legal_name", { required: true })} />
          </div>
          <div>
            <label>Display Name</label>
            <input {...register("display_name", { required: true })} />
          </div>
          <div>
            <label>Address</label>
            <input {...register("address", { required: true })} />
          </div>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditBankModal;
