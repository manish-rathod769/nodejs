const fs = require('fs');

let verifiedDetails = userData => {
    if(userData.fullName === undefined || userData.emailID === undefined || userData.projectAssigned === undefined){
        return false;
    }else{
        return true;
    }
}

let getUserID = () => {
    let count; let idArr =[];
    let userDataInObj = JSON.parse(fs.readFileSync("./users.txt", 'utf-8', err => {
        if(err) console.error(err);
    }));
    userDataInObj.forEach(( obj => {
        idArr.push(obj.id);
    }));
    for(let i=1; ;i++){
        if(!idArr.includes(i)){
            count = i;
            return count;
        }
    }
}

let uniqueEmailID = emailID => {
    let matchedEmailCount = 0;
    let userDataInObj = JSON.parse(fs.readFileSync("./users.txt", 'utf-8', err => {
        if(err) console.error(err);
    }));
    userDataInObj.forEach(( obj => {
        if(obj.emailID === emailID) {
            matchedEmailCount++;
        }
    }));
    return (matchedEmailCount) ? false : true;
}

module.exports = function(filePath, userDataToBeAdded){
    
    if(verifiedDetails(userDataToBeAdded)){
        if(!uniqueEmailID(userDataToBeAdded.emailID)){
            console.log("Email already exists in database!!!")
            return;
        }
        // getUserID()
        let userDataInFS = fs.readFileSync("./users.txt", 'utf-8', err => {
            if(err) console.error(err);
        });
        userDataInFS = userDataInFS.substring(0, userDataInFS.length-1);
        let userdetails = {
            "id": getUserID(),
            "fullName": userDataToBeAdded.fullName,
            "emailID": userDataToBeAdded.emailID,
            "projectAssigned": userDataToBeAdded.projectAssigned
        }
        userdetails = JSON.stringify(userdetails);
        let finalUserDataInFS = userDataInFS + "," + userdetails + "]";
        // console.log(JSON.parse(finalUserDataInFS));
        fs.writeFileSync(filePath, finalUserDataInFS, "utf8", err =>{
            if(err) console.error(err);
        });
        console.log("User data added successfully...");
    }else{
        console.log("Insufficient details for adding user.")
        return;
    }
}