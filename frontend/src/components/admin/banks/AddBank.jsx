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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Legal Name</label>
        <input {...register("legal_name", { required: true })} />
      </div>
      <div>
        <label>Display Name</label>
        <input {...register("display_name", { required: true })} />
      </div>
      <div>
        <label>Address</label>
        <input {...register("address", { required: true })} />
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Adding..." : "Add Bank"}
      </button>
    </form>
  );
}

export default AddBank;
