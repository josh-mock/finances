import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateCategory } from "../../api/categories";

function EditCategoryModal({ categories, onClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => updateCategory(categories.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: categories,
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Category</label>
            <input {...register("category", { required: true })} />
          </div>

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

export default EditCategoryModal;
