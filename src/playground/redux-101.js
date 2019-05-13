import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy: decrementBy
});

const set = ({ count } = {}) => ({
  type: 'SET',
  count: count
});

const reset = () => ({
  type: 'RESET',
  count: 0
});

const INITIAL_STATE = { count: 0 }
const countReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return { count: state.count + action.incrementBy }
    case 'DECREMENT':
      // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
      return { count: state.count - action.decrementBy }
    case 'RESET':
      return { count: 0 }
    case 'SET':
      return { count: action.count }
    default:
      return state;
  }
}



const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})


// Increment
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });
store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 5 }));

// unsubscribe();


store.dispatch(incrementCount());

// console.log(store.getState());

// Reset
store.dispatch(reset());
// store.dispatch({
//   type: 'RESET',
//   payload: 'RESETOU!'
// });


// Decrement
store.dispatch(decrementCount({ decrementBy: 1}));
store.dispatch(decrementCount({ decrementBy: 3}));
// store.dispatch({
  //   type: 'DECREMENT',
  //   decrementBy: 5
  // });
  // store.dispatch({
    //   type: 'DECREMENT',
    //   decrementBy: 5
    // });
    
store.dispatch(set({ count: 101}));
// store.dispatch({
//   type: 'SET',
//   count: 101
// })

// console.log(store.getState());