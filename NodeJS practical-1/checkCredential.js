const fs = require('fs');

module.exports = function(userData){
    let flag;
    if(userData.hasOwnProperty('id') || userData.hasOwnProperty('emailID')){
        let userCredential = userData.id || userData.emailID;
        let userDataInObj = JSON.parse(fs.readFileSync("./users.txt", 'utf-8', err => {
            if(err) console.error(err);
        }));
        userDataInObj.forEach(( obj => {
            if(obj.emailID === userCredential || obj.id === userCredential){
                userDetailsobj = obj;
                flag = true;
            }
        }));
        if(flag){
            return true;
        }else{
            console.log("Data does not exist!!!")
            return false;
        }
    }else{
        console.log("Please provide atleast id or emailID to update data!!!");
        return false;
    }
}