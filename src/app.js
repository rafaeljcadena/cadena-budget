import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configStore from './store/configStore'
import { addExpense, startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

import 'normalize.css/normalize.css'
import './styles/styles.scss';
import AppRouter, { history } from './routes/AppRouter'
import { firebase } from './firebase/firebase';
// import './playground/promises'

const store = configStore();

// store.dispatch(addExpense({ description: 'Gas Bill', amount: 150, createdAt: 45454545}))
// store.dispatch(addExpense({ description: 'Water Bill', amount: 100, createdAt: 45345}))
// store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 45346 }))
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
let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(app, document.getElementById('app'))
    hasRendered = true;
  }
}


ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))



firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if(history.location.pathname === '/'){
        history.push('/dashboard')
      }
    });
  } else {
    // console.log('log out')
    renderApp();
    store.dispatch(logout());
    history.push('/');
  }
});

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
