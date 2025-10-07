import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateBank } from "../../../api/banks";

function EditBankModal({ bank, onClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => updateBank(bank.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      onClose();
      toast.success("Bank updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { register, handleSubmit, reset } = useForm({ defaultValues: bank });

  const onSubmit = (data) =>
    mutation.mutate(data, { onSuccess: () => reset() });

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>Edit Bank</h4>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <label className="form__label">Legal Name</label>
            <input
              className="form__input"
              {...register("legal_name", { required: true })}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Display Name</label>
            <input
              className="form__input"
              {...register("display_name", { required: true })}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Address</label>
            <textarea
              className="form__textarea"
              {...register("address", { required: true })}
            />
          </div>

          <div className="modal__buttons">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="form__button"
            >
              {mutation.isLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="form__button--secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBankModal;
