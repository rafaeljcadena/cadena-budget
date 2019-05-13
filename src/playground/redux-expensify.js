import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

const expensesReducersDefaultState = []
const filterReducersDefaultState = {
  text: '',
  sortBy: '',
  startDate: undefined,
  endDate: undefined
}

const addExpense = (
    { description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
})

const editExpense = (id, expense) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  expense: expense
})


const expensesReducers = (state = expensesReducersDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id )
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return { ...expense, ...action.expense };
        }
      });
    default:
      return state;
  }
}

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text: text
});

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate: startDate
});

const setEndDate = (endDate) => ({
  type: 'SET_START_DATE',
  endDate: endDate
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const filtersReducers = (state = filterReducersDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text}
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount'}
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date'}
    case 'SORT_BY_START_DATE':
      return { ...state, startDate: action.startDate}
    case 'SORT_BY_END_DATE':
      return { ...state, endDate: action.endDate}
    default:
      return state;
  }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = typeof endDate !== 'string' || expense.description.includes(text);

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    } else {
      return 0;
    }
  });
}

const store = createStore(combineReducers({
  expenses: expensesReducers,
  filters: filtersReducers
}));

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
})


// Store creation

const rentObj = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const coffeeObj = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense(rentObj.expense))
// store.dispatch(editExpense(coffeeObj.expense.id, {description: 'Coffee EDITED'}))
// console.log(store.getState())

// store.dispatch(setTextFilter('rent EDITED'));
// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setStartDate(-120));

const demoState = {
  expenses: [{
    id: 'srgsRgrsg',
    description: 'January Rent',
    note: 'This weas the final payment for that address',
    amount: 54000,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}