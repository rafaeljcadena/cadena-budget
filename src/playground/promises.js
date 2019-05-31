const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'Rafael'
    // });
    reject('Something went wrong')
  }, 5000);
});

console.log('Before');

promise.then((data) => {
  console.log(data);
}).catch(error => console.log(error));

console.log('After');
