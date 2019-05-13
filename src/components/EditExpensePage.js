import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { editExpense } from '../actions/expenses'
import { removeExpense } from '../actions/expenses'


const EditExpensePage = (props) => (
  <div>
    <h1>Edit Expense</h1>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(id, expense) => {
        props.dispatch(editExpense(id, expense));
        props.history.push('/');
      }}
    />
    <button onClick={() => {
      props.dispatch(removeExpense({ id: props.expense.id }))
      props.history.push('/');
    }}>Remove</button>
  </div>
);

const mapStateToProps = (state, props) => {
  return { 
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);