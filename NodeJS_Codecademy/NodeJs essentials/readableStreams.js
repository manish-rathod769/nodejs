const readline = require('readline');
const fs = require('fs');

let settings = {
  input: fs.createReadStream('shoppingList.txt')
};

const myInterface = readline.createInterface(settings);

const printData = (data) => {
  console.log(`Item: ${data}`);
};

myInterface.on('line', printData);