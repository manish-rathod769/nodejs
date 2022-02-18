let returnUniqueDigit = arr => {
    let setArr = new Set(arr);
    let resultantArr = [...setArr]
    return resultantArr
}

console.log(returnUniqueDigit([1, 2, 3, 1, 2, 3, 4, 5, '5', 5]))