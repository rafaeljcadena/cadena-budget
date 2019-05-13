
// Object destructuring
// const person = {
//   name: 'Rafael',
//   age: 30,
//   location: {
//     city: 'Recife',
//     temp: 27
//   }
// };

// const { name = 'anonymous', age: idade } = person;

// console.log(`${name} is ${idade}.`);

// 
// Array Destructuring
// 

const address = ['1299 S Juniper Street', 'Recife', 'Pernambuco', '51020-021'];

const [, , state] = address

console.log(`You're in ${state}`)