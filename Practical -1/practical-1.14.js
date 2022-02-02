let arrObj = [
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
          ID: 5,
          fullname: "Chetan Punani",
          email: "chetan.punani@bacancy.com",
          college: "LDCE, Navrangpura",
          university: "GTU",
          technologyAssigned: "VueJS"
        }
    ]

let sortArrObj = (sortType) => {
    if(sortType == 'asc'){
        arrObj.sort( (a, b) => {
            if(a.fullname < b.fullname) return -1;
            else return 1;
        })
    }else{
        arrObj.sort( (a, b) => {
            if(a.fullname < b.fullname) return 1;
            else return -1;
        })
    }
}

sortArrObj("dsc")
console.log(arrObj)