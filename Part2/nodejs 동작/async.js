// Synchronous
console.log("1");
console.log("2");

// Asynchronous
setTimeout(() => {
  console.log("1");
}, 1000);
console.log("2");

// nodejs에서는 비동기를 주로 사용함
