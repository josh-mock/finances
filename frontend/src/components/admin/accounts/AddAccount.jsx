import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAccount } from "../../../api/accounts";
import { fetchBanks } from "../../../api/banks";

function AddAccount() {
  const queryClient = useQueryClient();

  const { data: banks = [], isLoading: banksLoading } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
  });

  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const { register, handleSubmit, reset, watch } = useForm();
  const accountType = watch("account_type");
  const isClosed = watch("is_closed");

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <h4>Add Account</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label className="form__label">Account Name</label>
          <input
            className="form__input"
            {...register("account_name", { required: true })}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Account Type</label>
          <select
            className="form__select"
            {...register("account_type", { required: true })}
          >
            <option value="bank">Bank</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        {accountType === "bank" && (
          <div className="form__group">
            <label className="form__label">Bank</label>
            <select
              className="form__select"
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
          <div className="form__group">
            <label className="form__label">Account Number</label>
            <input
              className="form__input"
              {...register("account_number", { required: false })}
            />
          </div>
        )}

        <div className="form__group">
          <label className="form__label">Year Opened</label>
          <input
            type="number"
            className="form__input"
            {...register("year_opened", {
              required: true,
              min: 1900,
              max: currentYear,
              valueAsNumber: true,
            })}
            placeholder="YYYY"
          />
        </div>

        <div className="form__checkbox">
          <input type="checkbox" {...register("is_closed")} />
          <label className="form__label">Account closed</label>
        </div>

        {isClosed && (
          <div className="form__group">
            <label className="form__label">Year Closed</label>
            <input
              type="number"
              className="form__input"
              {...register("year_closed", {
                required: false,
                min: 1900,
                max: currentYear,
                valueAsNumber: true,
              })}
              placeholder="YYYY"
            />
          </div>
        )}

        <button
          type="submit"
          className="form__button"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Account"}
        </button>
      </form>
    </>
  );
}

export default AddAccount;
