let arguments = process.argv.splice(2)
let sum=0;
for (let i=0; i<arguments.length; i++) {
    sum += Number(arguments[i]);
}
console.log(sum);