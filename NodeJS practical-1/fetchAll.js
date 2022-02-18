const fs = require('fs');

let sortUserByUserID = (a, b) => {
    return a.id - b.id;
}

module.exports = function (filePath){
    let usersDataInObj = JSON.parse(fs.readFileSync(filePath, 'utf8', err => {
        if (err) console.error(err);
    }));
    console.log("Data of all user fetched successfully...");
    usersDataInObj.sort( (a, b) => {
        return a.id - b.id;
    });
    usersDataInObj.forEach( obj => {
        console.log("\nid\t : " + obj.id)
        console.log("FullName : " + obj.fullName)
        console.log("EmailID\t : " + obj.emailID)
        console.log("Project\t\ : " + obj.projectAssigned)
    });
}