const birrFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

export function formatCurrency(amount) {
  return birrFormatter.format(amount)
}
