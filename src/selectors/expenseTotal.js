export default (expenses) => {
  if(expenses.length === 0) return 0.0
  return expenses.map(e => e.amount).reduce((sum, value) => sum + value)
}