export default function formatCurrency(amountInPence, rounding = false) {
  let amount = amountInPence / 100;
  if (rounding) {
    amount = Math.ceil(amount);
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
