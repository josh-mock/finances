import { useQuery } from "@tanstack/react-query";
import { fetchBanks } from "../api/banks";

export default function BanksList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading banks</div>;
  if (!data || data.length === 0) return <div>No banks found</div>;

  return (
    <ul>
      {data.map((bank) => (
        <li
          key={bank.id}
        >{`legal name: ${bank.legal_name}, display name: ${bank.display_name}, address: ${bank.address}`}</li>
      ))}
    </ul>
  );
}
