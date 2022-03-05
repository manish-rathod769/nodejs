const yargs = require('yargs');
const argv = yargs.argv;
const { addUser, deleteUser, fetchAll, fetchOne, updateUser } = require('./userOperation');

const operation = argv.operation;
const fullname = argv.fullname;
const emailID = argv.emailID;
const projectAssigned = argv.projectAssigned;

if(!["add", "update", "delete", "fetchOne", "fetchAll"].includes(operation)){
    console.log("Invalid operation!!! \nPlease enter valid operation!!!");
    return;
}

switch(operation){
  case "add":
    addUSer("./users.txt", argv);
    break;
  case "update":
    updateUser("./users.txt", argv);
    break;
  case "delete":
    deleteUser("./users.txt", argv);
    break;
  case "fetchOne":
    fetchOne("./users.txt", argv);
    break;
  default:
    fetchAll("./users.txt");
    break; 
}