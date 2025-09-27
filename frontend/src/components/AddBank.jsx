import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBank } from "../api/banks";

function AddBank() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      legal_name: "New Bank",
      display_name: "New Bank",
      address: "asdasdasd",
    });
  };

  return <button onClick={handleSubmit}>Add Bank</button>;
}

export default AddBank;
