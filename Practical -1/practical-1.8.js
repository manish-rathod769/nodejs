let diffNumArr = num => {
    let count=0;
    let diffNum = []

    while(diffNum.length<num){
        let n = Math.floor(Math.random() * num + 1);
        (!diffNum.includes(n)) ? diffNum.push(n) : "" ;
    }
    
    return diffNum;
}

console.log(diffNumArr(8));