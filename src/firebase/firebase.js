import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { firebase, googleAuthProvider, database as default };

// const showArray = (snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapShot) => {
//     expenses.push({
//       id: childSnapShot.key,
//       ...childSnapShot.val()
//     })

//   })
//   console.log(expenses);
// }
// database.ref('expenses').on('value', showArray)

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').push({
//   description: 'Rent',
//   note: 'Some note here',
//   amount: 5000,
//   createdAt: 654564564
// })

// database.ref('expenses').push({
//   description: 'Buy food',
//   note: 'Some OTHER note here',
//   amount: 6500,
//   createdAt: 112344343
// })

// database.ref('expenses').push({
//   description: 'Other Rent',
//   note: 'Some some note here',
//   amount: 5000,
//   createdAt: 436564564
// })


// database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// })



// Fetching some data
// database.ref().once('value')
//               .then((snapshot) => {
//                 const val = snapshot.val();
//                 console.log(val);
//               })
//               .catch((error) => console.log('Error fetching data', error) )

// database.ref().set({
//   name: 'Rafael',
//   age: 31,
//   stressLevel: 6,
//   job: {
//     title: 'Software Developer',
//     company: 'Google'
//   },
//   isSingle: false,
//   location: {
//     city: 'Recife',
//     country: 'Brazil'
//   }
// }).then(() => {
//   console.log('Data is saved')
// }).catch((error) => {
//   console.log('This failed.')
// });

// database.ref().set('this is my data')

// database.ref('age').set(33);
// database.ref('location/city').set('São Paulo');
// database.ref('attributes').set({
//   height: 190,
//   weight: 200
// }).then(() => {
//   console.log('Saved!')
// })

// const isSingleRef = database.ref('isSingle')
// database.ref('isSingle').set(null)
// isSingleRef.remove().then(() => console.log('Is single removed!'))

// Works only in the root level or on the level defined in ref()
// database.ref().update(
//   {
//     name: 'Rafael EDITED',
//     age: 31,
//     job: 'Developer',
//     isSingle: null
//   }
// )

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// })