import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { fetchBudget, updateBudget } from "../api/budget";
import Currency from "../components/Currency/Currency";

export default function Budget() {
  const queryClient = useQueryClient();

  const { data: budget = [], isLoading } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchBudget,
  });

  const mutation = useMutation({
    mutationFn: (amounts) => updateBudget(amounts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      toast.success("Budget updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: { amounts: {} },
  });

  useEffect(() => {
    if (budget.length) {
      const defaultAmounts = {};
      budget.forEach((item) => {
        defaultAmounts[item.id] = item.budgeted_amount
          ? item.budgeted_amount / 100
          : 0;
      });
      reset({ amounts: defaultAmounts });
    }
  }, [budget, reset]);

  const watchedAmounts = useWatch({ control, name: "amounts" });

  const total = watchedAmounts
    ? Object.values(watchedAmounts).reduce(
        (sum, val) => sum + Number(val || 0),
        0
      )
    : 0;

  const onSubmit = (data) => {
    const payload = {};
    Object.entries(data.amounts).forEach(([id, amount]) => {
      payload[Number(id)] = Math.round(Number(amount) * 100);
    });
    mutation.mutate(payload);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Average monthly</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{<Currency value={item.average_monthly_spend} />}</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  {...register(`amounts.${item.id}`)}
                  className="form__input"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <strong>Total</strong>
            </td>
            <td>
              <strong>
                <Currency value={Math.round(total * 100)} />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
