// 브라우저와 Node.js 공통으로 사용가능한 API
// console api
let greeting = `John Hello!`;
console.log(greeting);

// 브라우저 api : window 객체
// nodejs에서 사용하려하면 에러 발생

// nodejs api : Process 객체
// 브라우저에서는 사용 불가(Process is nor defined)
// Process.argv 프로퍼티 사용 cmd에서 실행시 입력한 내용들이 어레이로 들어가있음 [API.js, ...]
let who = process.argv[2];

let greet = `${who} Hello!`;

console.log(greet);
