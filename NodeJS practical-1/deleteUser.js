const fs = require('fs');
const checkCredential = require('./checkCredential');

module.exports = function(filePath, userDataToBeDelete){
    let dataAfterDelete = [];
    if(!checkCredential(userDataToBeDelete)){
        return;
    }
    let userDataInObj = JSON.parse(fs.readFileSync("./users.txt", 'utf-8', err => {
        if(err) console.error(err);
    }));
    userDataInObj.forEach( obj => {
        if(!(obj.emailID === userDataToBeDelete.emailID || obj.id === userDataToBeDelete.id)){
            dataAfterDelete.push(obj);  
        }
    });
    fs.writeFileSync(filePath, JSON.stringify(dataAfterDelete), err => {
        if(err) console.error(err);
    });
    console.log("Data deleted successfully.");
}