const numArr = [9, 7, 2, 3, 4, 10];

let maximum = (arr) => {
    return arr.reduce( (acc, curr) => {
        return curr > acc ? curr : acc;
    });
}

console.log(maximum(numArr));