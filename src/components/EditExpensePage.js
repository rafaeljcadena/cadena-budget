import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { startEditExpenses } from '../actions/expenses'
import { startRemoveExpense } from '../actions/expenses'


export class EditExpensePage extends React.Component {


  render() {
    return (
      <div>
        <h1>Edit Expense</h1>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={(id, expense) => {
            // this.props.dispatch(editExpense(id, expense));
            this.props.startEditExpenses(id, expense);
            this.props.history.push('/');
          }}
          buttonLabel='Edit Expense'
        />
        <button onClick={() => {
          this.props.startRemoveExpense({ id: this.props.expense.id })
          this.props.history.push('/');
        }}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { 
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
  startEditExpenses: (id, expense) => dispatch(startEditExpenses(id, expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);