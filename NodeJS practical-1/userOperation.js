const fs = require('fs');

let verifiedDetails = userData => {
  if(!userData.fullName || !userData.emailID || !userData.projectAssigned){
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

let sortUserByUserID = (a, b) => {
  return a.id - b.id;
}

let addUser = (filePath, userDataToBeAdded) => {
    
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

let checkCredential = (userData) => {
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
    console.log("Please provide atleast id or emailID!!!");
    return false;
  }
}

let deleteUser = (filePath, userDataToBeDelete) => {
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

let fetchAll = (filePath) => {
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

let fetchOne = (filePath, userDataToFetch) => {
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

let updateUser = (filePath, userDataToBeUpdate) => {
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
  });
  console.log("Data updated succesfully...")
}

module.exports = {
  addUser,
  deleteUser,
  fetchAll,
  fetchOne,
  updateUser
}