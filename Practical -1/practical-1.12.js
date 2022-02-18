const numArr = [1, 2, -3, 4, 5, -6];

let sumOfPositiveNum = arr => {
    let newPosArr = arr.filter( n => {
        return n > 0;
    });
    let sum = newPosArr.reduce( (acc, curr) => {
        return acc+ curr;
    });

    return sum;
}

console.log(sumOfPositiveNum(numArr));