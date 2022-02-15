const fs = require("fs");

const fileBuff = fs.readFileSync(process.argv[2]);
const numOfLine = fileBuff.toString().split("\n").length - 1;
// console.log("Number of line : ", numOfLine);
console.log(numOfLine); 