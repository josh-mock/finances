import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateAccount } from "../../api/accounts";
import { fetchBanks } from "../../api/banks";

function EditAccountModal({ account, onClose }) {
  const queryClient = useQueryClient();

  const { data: banks = [], isLoading: banksLoading } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
  });

  const mutation = useMutation({
    mutationFn: (data) => updateAccount(account.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      onClose();
    },
  });

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: account,
  });
  const accountType = watch("account_type");
  const isClosed = watch("is_closed");

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Account Name</label>
            <input {...register("account_name", { required: true })} />
          </div>

          <div>
            <label>Account Type</label>
            <select {...register("account_type", { required: true })}>
              <option value="bank">Bank</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          {accountType === "bank" && (
            <div>
              <label>Bank</label>
              <select
                {...register("bank_id", { required: false })}
                disabled={banksLoading}
              >
                <option value="">Select a bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.display_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {accountType === "bank" && (
            <div>
              <label>Account Number</label>
              <input {...register("account_number", { required: false })} />
            </div>
          )}

          <div>
            <label>Year Opened</label>
            <input
              type="number"
              {...register("year_opened", {
                required: true,
                min: 1900,
                max: currentYear,
              })}
              placeholder="YYYY"
            />
          </div>

          <div>
            <label>
              <input type="checkbox" {...register("is_closed")} />
              Account closed
            </label>
          </div>

          {isClosed && (
            <div>
              <label>Year Closed</label>
              <input
                type="number"
                {...register("year_closed", {
                  required: false,
                  min: 1900,
                  max: currentYear,
                })}
                placeholder="YYYY"
              />
            </div>
          )}

          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAccountModal;
