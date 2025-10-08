import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { fetchAccounts } from "../../api/accounts";
import { fetchCategories } from "../../api/categories";
import { createTransaction } from "../../api/transactions";

export default function AddTransaction() {
  const queryClient = useQueryClient();

  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const amountCents = Math.round(Number(data.amount) * 100);

    const payload = { ...data, amount: amountCents };

    mutation.mutate(payload, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <form className="form form--add-transaction" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label className="form__label">Date</label>
          <input
            type="date"
            className="form__input"
            {...register("date", { required: true })}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Amount</label>
          <input
            type="number"
            step="0.01"
            className="form__input"
            {...register("amount", { required: true, valueAsNumber: true })}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Description</label>
          <input
            type="text"
            className="form__input"
            {...register("description")}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Type</label>
          <select
            className="form__select"
            {...register("type", { required: true })}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
            <option value="Transfer In">Transfer In</option>
            <option value="Transfer Out">Transfer Out</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Account</label>
          <select
            className="form__select"
            {...register("account_id", { required: true })}
            disabled={accountsLoading}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Category</label>
          <select
            className="form__select"
            {...register("category_id", { required: true })}
            disabled={categoriesLoading}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="form__button"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
