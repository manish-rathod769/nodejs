let validate = name => {
    const regExp = /^[A-Za-z\p{L}]+[\s]{1}[-A-Za-z\p{L}]+['\-]{0,1}[-A-Za-z\p{L}]+$/;
    return regExp.test(name);
}

let addNameToArr = (arr, name) => {
    if(arr.includes(name)){
        return "\nName already exist in array.";
    }
    if(!validate(name)){
        return "\nEntered name is invalid.\nPlease enter valid name.";
    }
    arr.push(name);
    console.log("\nAdded name: " + name);
    return arr;
}

arrOfNames = [];

console.log(addNameToArr(arrOfNames,"Derek O'Brien"));
console.log(addNameToArr(arrOfNames,"Derek O'Brien"));
console.log(addNameToArr(arrOfNames,"Derek O''Brien"));