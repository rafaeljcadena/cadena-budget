import React from 'react'
import { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expenseTotal';
import numeral from 'numeral'

const ExpenseSummary = ({ expensesCount, totalAmount }) => {

  return(
    <h3>Viewing {expensesCount} expenses totalling: {numeral(totalAmount / 100).format('$0,0.00')}</h3>
  );
}

const mapStateToProps = (state) => {
  const selectedExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: selectedExpenses.length,
    totalAmount: expenseTotal(selectedExpenses)
  }
}

export default connect(mapStateToProps)(ExpenseSummary)
