const factFunReduce = (num) => {
    let arr = [];
    for(let i = 1 ; i <= num ; i++){
        arr.push(i);
    }
    const factReduce = arr.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
    });
    return factReduce;
}

const factFunMap = (num) => {
    let arr = [];
    let facto = 1;
    for(let i = 1 ; i <= num ; i++){
        arr.push(i);
    }
    const factMap = arr.map(element => {
        facto *= element;
        return element;
    });
    return facto;
}

let n = 5;
let fact1 = factFunReduce(n);
console.log(`Using reduce iterator: ${fact1}`);
let fact2 = factFunMap(n);
console.log(`Using map iterator: ${fact2}`);