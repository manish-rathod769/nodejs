const yargs = require('yargs');
const argv = yargs.argv;
const addUSer = require('./addUser');

const operation = argv.operation;
const fullname = argv.fullname;
const emailID = argv.emailID;
const projectAssigned = argv.projectAssigned;

if(!["add", "update", "delete", "fetchOne", "fetchOne", "fetchAll"].includes(operation)){
    console.log("Invalid Operation. Please add valid operation.");
    return;
}
if(operation === "add"){   
    addUSer("./users.txt", argv);
}