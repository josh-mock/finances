import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateTransaction } from "../../api/transactions";
import { fetchAccounts } from "../../api/accounts";
import { fetchCategories } from "../../api/categories";
import dayjs from "dayjs";

export default function EditTransactionModal({ transaction, onClose }) {
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
    mutationFn: (data) => updateTransaction(transaction.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onClose();
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...transaction,
      amount: transaction.amount / 100,
      date: transaction.date
        ? dayjs(transaction.date).format("YYYY-MM-DD")
        : "",
    },
  });

  const onSubmit = (data) => {
    const payload = { ...data, amount: data.amount * 100 };
    mutation.mutate(payload, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>Edit Transaction</h4>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="modal__buttons">
            <button
              type="submit"
              className="form__button"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Saving..." : "Save Changes"}
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
