import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

// const date = new Date();
moment.locale('pt-br')
const now = moment();
console.log(now.format("Do MMMM YYYY"));

class ExpenseForm extends React.Component {

  state = {
    id: '',
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    error: ''
  }

  componentDidMount(){
    if (this.props.expense) {
      let { id = '', description = '', note = '', amount = '', createdAt = moment() } = this.props.expense;
      this.setState(() => ({ id, description, amount: amount ? (amount / 100).toString() : amount, createdAt: createdAt ? moment(createdAt) : moment(), note }))
    }
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description: description }));
  } 

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note: note }))
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(() => ({ amount: amount }))
    }
  }

  onDateChange = (createdAt) => {
    if(createdAt){
      this.setState(() => ({ createdAt: createdAt }))
    }
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    const { description, amount, createdAt, note } = this.state
    
    if(!description || !amount){
      this.setState(() => ({ error: 'Please fill up the description and amount' }))
    } else {
      this.setState(() => ({ error: '' }))
      console.log('submited');

      if(this.props.expense){
        // const { id } = this.state
        const { id, description, amount, createdAt, note } = this.state
        this.props.onSubmit(id, { description, amount: (parseInt(amount) * 100), createdAt: createdAt.valueOf(), note })
      } else {
        this.props.onSubmit({ description, amount: (parseInt(amount) * 100), createdAt: createdAt.valueOf(), note })
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmitHandler}>
          <input 
            type='text'
            placeholder='description'
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
            />
          <input 
            type='text'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
            />
          <SingleDatePicker 
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            numberOfMonths={1}
            onFocusChange={this.onFocusChange}
            isOutsideRange={() => false }
          />
          <textarea
            placeholder='Add a note for your expense(optional)'
            onChange={this.onNoteChange}
          ></textarea>
          <button type='submit'>{this.props.buttonLabel}</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm;