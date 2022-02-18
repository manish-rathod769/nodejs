numArr = [9, 7, 2, 3, 4, 11];

let average = (array) => {
    let len = array.length;

    let sum = array.reduce( (accumlator, currentvalue) => {
        return accumlator + currentvalue;
    });

    return sum/len;

}

console.log(average(numArr));