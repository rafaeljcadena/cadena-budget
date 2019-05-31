import { firebase, googleAuthProvider } from '../firebase/firebase'

export const startLogIn = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}