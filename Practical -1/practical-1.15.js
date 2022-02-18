function compareObj(obj1, obj2) {
    let pro1 = Object.getOwnPropertyNames(obj1);
    let pro2 = Object.getOwnPropertyNames(obj2);
    if (pro1.length != pro2.length) {
        return false;
    }
    for (let i = 0; i < pro1.length; i++) {
        let prop = pro1[i];
        let isBothObj = typeof(obj1[prop]) === 'object' && typeof(obj2[prop]) === 'object';
        if ((!isBothObj && (obj1[prop] !== obj2[prop])) || (isBothObj && !compareObj(obj1[prop], obj2[prop]))) {
            return false;
        }
    }
    return true;
}

const isObjPresent = (obj, arr) => {
    let flag = 0;
    arr.forEach(function(element){
        if(compareObj(obj, element)){
            flag = 1;
        }
    });
    if(flag === 1){
        return true;
    }
    else{
        return false;
    }
}

const obj1 = {
    fname: 'Manish',
    lname: 'Rathod',
    child: {
        num1: 49,
        num2: 80
    }
};

const objArr = [
    {
        lname: 'Rathod',
        child: {
            num2: 81,
            num1: 49
        },
        fname: 'Manish'
    },
    {
        lname: 'Rathod',
        child: {
            num2: 41,
            num1: 68
        },
        fname: 'Manish'
    }

]

let pushObjToArr = (obj, arr) => {
    if(!isObjPresent(obj, arr)){
        arr.push(obj);
        return arr;
    }
    else{
        console.log('Array already contains the same object.');
        return arr;
    }
}

let resObjArr = pushObjToArr(obj1, objArr);
console.log(resObjArr);