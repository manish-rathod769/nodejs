let traineeObj = require('./Practical - 3.1.json');

let findTechnologyAndTrainee = arrObj => {
    let resultObj = {};
    arrObj.forEach( obj => {
        let tech = obj.technologyAssigned;
        if(resultObj[tech]){
            resultObj[tech].push(obj)
        }else{
            let arr = [];
            arr.push(obj);
            resultObj[tech] = arr;
        }
    })
    return resultObj;
}

console.log(findTechnologyAndTrainee(traineeObj))