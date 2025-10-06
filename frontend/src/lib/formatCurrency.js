export default function formatCurrency(amountInPence) {
  return (amountInPence / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
