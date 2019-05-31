import React from "react";
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expenseTotal';
import numeral from 'numeral'

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {/* <p>Total Expenses: {props.expenses.length}</p>
    <p>Total Amount: {numeral(props.total / 100).format('$0,0.00')}</p> */}
    <ol>
      {props.expenses.map((expense) => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))}
    </ol>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
};

export default connect(mapStateToProps)(ExpenseList);