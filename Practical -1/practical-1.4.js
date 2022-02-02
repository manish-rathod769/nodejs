let numArr = [9, 7, 9, 2, 3, 3, 4, 10];

let diffNumInArr = (arr) => {
    let count = 0;
    let diffNum = [];

    let findDiffNum = arr.reduce( (acc, curr) => {
        if(count === 0){
            diffNum.push(acc);
            (!diffNum.includes(curr)) ? diffNum.push(curr) : "" ;
        }else{
            (!diffNum.includes(curr)) ? diffNum.push(curr) : "" ;
        }
        count++;
    });


    return diffNum;
}

console.log(diffNumInArr(numArr))