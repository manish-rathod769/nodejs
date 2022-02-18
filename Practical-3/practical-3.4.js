let obj1 = {
    ID : 101,
    name: "emp 1",
    technologyAssigned: "NodeJS",
    emailID : "emp.1@bacancy.com"
};

let obj2 = {
    ID : 102,
    name: "emp 2",
    technologyAssigned: "ROR",
    emailID : "emp.2@bacancy.com"
};

let swapObjects = (obj1, obj2) => {
    [obj1, obj2] = [obj2, obj1];
    return [obj1, obj2];
}

console.log("Before swapping : \n", obj1, obj2);
console.log("\nAfter swapping : \n", swapObjects(obj1, obj2));