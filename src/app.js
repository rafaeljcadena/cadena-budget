import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configStore from './store/configStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

import 'normalize.css/normalize.css'
import './styles/styles.scss';
import AppRouter from './routes/AppRouter'

const store = configStore();

store.dispatch(addExpense({ description: 'Gas Bill', amount: 150, createdAt: 45454545}))
store.dispatch(addExpense({ description: 'Water Bill', amount: 100, createdAt: 45345}))
store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 45346 }))
// store.dispatch(setTextFilter('bill'))

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters.text)
console.log(visibleExpenses);
// console.log(store.getState());

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'))


// class OldSyntax{
//   constructor(){
//     this.name = 'Mike';
//     this.getGreeting = this.getGreeting.bind(this)
//   }

//   getGreeting(){
//     return `Hi, My name is ${this.name}`
//   }
// }

// const oldSyntax = new OldSyntax();
// console.table(oldSyntax)

// const getGreeting = oldSyntax.getGreeting;
// console.log(getGreeting())

// // ---------------

// class NewSyntax{
//   name = 'Jen';
//   getGreeting = () => {
//     return `Hi, My name is ${this.name}`
//   }

// }

// const newSyntax = new NewSyntax();
// console.table(newSyntax)

// const newGetGreeting = newSyntax.getGreeting;
// console.log(newGetGreeting())
