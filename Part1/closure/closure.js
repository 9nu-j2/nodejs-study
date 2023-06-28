function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(outerVariable);
    console.log(innerVariable);
  };
}

const newFunction = outerFunction("outside");
console.log("New function: " + newFunction);
newFunction("inside");
