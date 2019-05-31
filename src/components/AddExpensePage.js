import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {

  onSubmit = (expense) => {
    // console.log(expense);
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }

  render(){
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
          buttonLabel='Add Expense'
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(null, mapDispatchToProps)(AddExpensePage);