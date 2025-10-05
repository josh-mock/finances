import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../api/transactions";

export default function DeleteTransactionButton({ id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <button onClick={handleDelete} disabled={mutation.isLoading} className="table__button table__button--danger">
      {mutation.isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
