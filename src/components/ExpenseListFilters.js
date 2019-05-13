import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'
import { DateRangePicker } from 'react-dates'


// const ExpenseListFilters = ({filters}) => (
class ExpenseListFilters extends React.Component {


  state = {
    calendarFocused: null
  }


  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  }
  
  render(){
    return (
      <div>
        <input type='text' value={this.props.filters.text} onChange={(e) => {
          this.props.dispatch(setTextFilter(e.target.value));
        }} />

        <select value={this.props.filters.sortBy} onChange={(e) => {
          const value = e.target.value;
          if (value === 'amount') {
            this.props.dispatch(sortByAmount());
          } else if (value === 'date') {
            this.props.dispatch(sortByDate());
          }
        }}>
          <option value='date'>Date</option>
          <option value='amount'>Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={(calendarFocused) => this.setState((state) => ({ ...state, calendarFocused }))}
          numberOfMonths={1}
          showClearDates={true}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilters);