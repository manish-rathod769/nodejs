var inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']

let countWords = arr => {
    let count = {};
    let c = 0;
    let countingWords = arr.reduce((acc, curr) => {
        if(c == 0){
            count[acc] = 1;
            (count[curr]) ? count[curr] += 1 : count[curr] = 1;
        }else{
            (count[curr]) ? count[curr] += 1 : count[curr] = 1;
        }
        return acc; 
    })
    return count;
}

console.log(countWords(inputWords));

module.exports = countWords;