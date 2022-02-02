const str = "12.5, 1, 15.5, 45, 8, 3";

let sumFunction = (str) => {
    let strArr = str.split(",");
    let sum = strArr.reduce( (acc, curr) => {
        return parseFloat(acc) + parseFloat(curr);
    });
    return sum;
}

console.log(sumFunction(str));