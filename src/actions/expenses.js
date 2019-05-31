import uuid from 'uuid';
import database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { description = '', note = '',  amount = 0,  createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt};
    
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
                                            dispatch(addExpense({
                                              id: ref.key,
                                              ...expense
                                            }));
                                          })

  }
}

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
})

export const startRemoveExpense = ({ id }) => {

  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/expenses/${id}`).remove()
                                        .then(() => {
                                          dispatch(removeExpense({ id }));
                                        })
  }
}

export const editExpense = (id, expense) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  expense: expense
});

export const startEditExpenses = (id, expense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    
    return database.ref(`users/${uid}/expenses/${id}`).update(expense)
                                        .then(() => {
                                          dispatch(editExpense(id, expense))
                                        })
  }
}


export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value')
                            .then((snapshot) => {
                              const expenses = [];

                              snapshot.forEach((childSnapShot) => {
                                expenses.push({
                                  id: childSnapShot.key,
                                  ...childSnapShot.val()
                                });
                              });
                              dispatch(setExpenses(expenses));
                            })
  }
}