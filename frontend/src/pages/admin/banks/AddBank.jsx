import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createBank } from "../../../api/banks";

function AddBank() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
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
      <h4>Add Bank</h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label className="form__label">Legal Name</label>
          <input
            className="form__input"
            {...register("legal_name", { required: true })}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Display Name</label>
          <input
            className="form__input"
            {...register("display_name", { required: true })}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Address</label>
          <textarea
            className="form__textarea"
            {...register("address", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="form__button"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Bank"}
        </button>
      </form>
    </>
  );
}

export default AddBank;
