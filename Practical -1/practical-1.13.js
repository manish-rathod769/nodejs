let objArr = [
    {
      ID: 1,
      fullname: "Aayush Adeshara",
      email: "aayush.adeshara@bacancy.com",
      college: "Government Engineering college, Gandhinagar",
      university: "GTU",
      technologyAssigned: "ROR"
    },
    {
      ID: 2,
      fullname: "Akshit Modi",
      email: "akshit.modi@bacancy.com",
      college: "VGEC, Chandkheda",
      university: "GTU",
      technologyAssigned: "DevOps"
    },
    {
      ID: 2,
      fullname: "Akshit Modi",
      email: "akshit.modi@bacancy.com",
      college: "VGEC, Chandkheda",
      university: "GTU",
      technologyAssigned: "DevOps"
    },
    {
      ID: 2,
      fullname: "Akshit Modi",
      email: "akshit.modi@bacancy.com",
      college: "VGEC, Chandkheda",
      university: "GTU",
      technologyAssigned: "DevOps"
    },
    {
      ID: 3,
      fullname: "Apexa Patel",
      email: "apexa.patel@bacancy.com",
      college: "VGEC, Chandkheda",
      university: "GTU",
      technologyAssigned: "NodeJS"
    },
    {
      ID: 4,
      fullname: "Bhargav Dobariya",
      email: "bhargav.dobariya@bacancy.com",
      college: "VVPEC, Rajkot",
      university: "GTU",
      technologyAssigned: "Flutter"
    },
    {
      ID: 4,
      fullname: "Bhargav Dobariya",
      email: "bhargav.dobariya@bacancy.com",
      college: "VVPEC, Rajkot",
      university: "GTU",
      technologyAssigned: "Flutter"
    },
    {
      ID: 5,
      fullname: "Chetan Punani",
      email: "chetan.punani@bacancy.com",
      college: "LDCE, Navrangpura",
      university: "GTU",
      technologyAssigned: "VueJS"
    }
]

let countOccurence = (arr) => {
    let count = {};
    arr.forEach( (a)=> {
        let key = a.ID;
        (count[key]) ? count[key] += 1 : count[key] = 1 
    })
    return count;
}

let removeDuplicate = (arr) => {
    let visited = {};
    let uniqueObjArr = [];
    arr.forEach( a => {
        let key = a.ID;
        if(!visited[key]){
            visited[key] = 1;
            uniqueObjArr.push(a)
        }
    });
    return uniqueObjArr;
}

console.log(countOccurence(objArr))
console.log(removeDuplicate(objArr))