import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCategory } from "../../../api/categories";

function AddCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <h4>Add Category</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label className="form__label">Category</label>
          <input
            className="form__input"
            {...register("category", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="form__button"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </>
  );
}

export default AddCategory;
