const trainee = {
    "_id": 1,
    "firstName": "Lav",
    "lastName": "Panchal",
    "aboutMe": "I code",
    "profileImage": "users/1.png",
    "academicDetails": {
        "highestQualification": "B.E/B.Tech.",
        "college": "Government Engineering College, Gandhinagar",
        "university": "GTU",
        "passoutYear": 2022
    },
    "contactDetails": {
        "primaryEmailID": "aayush.adeshara@bacancy.com",
        "alternateEmailID": "",
        "primaryContactNo": 123,
        "alternateContactNo": 456
    },
    "technologyAssigned": "ROR"
}

const objToString = JSON.stringify(trainee);
const copyObject = JSON.parse(objToString);

[copyObject.firstName, copyObject.lastName, copyObject.contactDetails.primaryEmailID] = ["Krushit", "Dudhat", "krushit.dudhat@bacancy.com"];
console.log("Original object : \n", trainee);
console.log("\nCopied object : ", copyObject);