import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../api/categories";

export default function DeleteCategoryButton({ id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isLoading}
      className="table__button table__button--danger"
    >
      {mutation.isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
