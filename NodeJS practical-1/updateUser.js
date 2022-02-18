const fs = require('fs');
const checkCredential = require('./checkCredential');

module.exports = function(filePath, userDataToBeUpdate){
    if(!checkCredential(userDataToBeUpdate)){
        return;
    }
    let userDataInObj = JSON.parse(fs.readFileSync("./users.txt", 'utf-8', err => {
        if(err) console.error(err);
    }));
    // Containe all the property that need to be change.
    let propToBeUpdate = Object.keys(userDataToBeUpdate);
    propToBeUpdate.pop();
    propToBeUpdate.shift();
    userDataInObj.forEach( obj => {
        if(obj.emailID === userDataToBeUpdate.emailID || obj.id === userDataToBeUpdate.id){
            propToBeUpdate.forEach( prop => {
                if( prop=== "fullName"){
                    obj.fullName = userDataToBeUpdate.fullName;
                }else if(prop === "projectAssigned"){
                    obj.projectAssigned = userDataToBeUpdate.projectAssigned;
                }
            });
        }
    });
    fs.writeFileSync(filePath, JSON.stringify(userDataInObj), err => {
        if(err) console.error(err);
    })
    console.log("Data updated succesfully...")
}