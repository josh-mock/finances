import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
      toast.success("Account added successfully");
      reset({
        account_type: "bank",
        account_name: "",
        bank_id: "",
        account_number: "",
        year_opened: "",
        is_isa: false,
        is_closed: false,
        year_closed: "",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { account_type: "bank" },
  });

  const accountType = watch("account_type");
  const isClosed = watch("is_closed");
  const currentYear = new Date().getFullYear();

  const onSubmit = (data) => {
    const payload = {
      account_type: data.account_type,
      account_name: data.account_name,
      year_opened: data.year_opened,
      is_isa: data.is_isa,
      is_closed: data.is_closed,
      year_closed: data.is_closed ? data.year_closed : null,
      ...(data.account_type === "bank" && {
        bank_id: data.bank_id || null,
        account_number: data.account_number || null,
      }),
    };

    mutation.mutate(payload);
  };

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
          <>
            <div className="form__group">
              <label className="form__label">Bank</label>
              <select
                className="form__select"
                {...register("bank_id")}
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

            <div className="form__group">
              <label className="form__label">Account Number</label>
              <input className="form__input" {...register("account_number")} />
            </div>
          </>
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
          <input type="checkbox" {...register("is_isa")} />
          <label className="form__label">ISA</label>
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
