const fs = require('fs');
const checkCredential = require('./checkCredential');

module.exports = function(filePath, userDataToFetch){
    if(!checkCredential(userDataToFetch)){
        return;
    }
    let userDataInObj = JSON.parse(fs.readFileSync("./users.txt", 'utf-8', err => {
        if(err) console.error(err);
    }));
    userDataInObj.forEach( obj => {
        if(obj.emailID === userDataToFetch.emailID || obj.id === userDataToFetch.id){
            console.log("User's data fetch successfully...");
            console.log("\nUser's id: " + obj.id);
            console.log("User's fullname: " + obj.fullName);
            console.log("User's emailID: " + obj.emailID);
            console.log("User's projectAssigned: " + obj.projectAssigned);  
        }
    });
}