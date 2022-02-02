let numArr1 = [1, 2, 3, 4, 5];
let numArr2 = [3, 4, 5, 6, 7];

let diffNum = (arr1, arr2) => {
    
    let diffNumArr = [];

    let findDiffNum = (arr1, arr2) => {
        arr1.forEach( num => {
            let ele = arr2.findIndex( ele => {
                return num === ele;
            });
            (ele === -1) ? diffNumArr.push(num) : "" ;
        });
    }

    findDiffNum(arr1, arr2);
    findDiffNum(arr2, arr1);

    console.log(diffNumArr);
}

diffNum(numArr1, numArr2)