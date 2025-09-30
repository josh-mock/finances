import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBank } from "../../api/banks"

export default function DeleteBankButton({ id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <button onClick={handleDelete} disabled={mutation.isLoading}>
      {mutation.isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
