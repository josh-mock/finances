import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateCategory } from "../../../api/categories";

function EditCategoryModal({ category, onClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => updateCategory(category.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: category,
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
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <label className="form__label">Category</label>
            <input
              className="form__input"
              {...register("category", { required: true })}
            />
          </div>

          <div className="modal__buttons">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="form__button"
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

export default EditCategoryModal;
