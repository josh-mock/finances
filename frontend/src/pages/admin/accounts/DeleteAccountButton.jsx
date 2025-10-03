import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "../../../api/accounts";

export default function DeleteAccountButton({ id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
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
