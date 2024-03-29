const yargs = require('yargs');
const argv = yargs.argv;
const addUSer = require('./addUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const fetchOne = require('./fetchOne');
const fetchAll = require('./fetchAll');

const operation = argv.operation;
const fullname = argv.fullname;
const emailID = argv.emailID;
const projectAssigned = argv.projectAssigned;

if(!["add", "update", "delete", "fetchOne", "fetchOne", "fetchAll"].includes(operation)){
    console.log("Invalid operation!!! \nPlease enter valid operation!!!");
    return;
}
if(operation === "add"){   
    addUSer("./users.txt", argv);
}else if(operation === "update"){
    updateUser("./users.txt", argv);
}else if(operation === "delete"){
    deleteUser("./users.txt", argv);
}else if(operation === "fetchOne"){
    fetchOne("./users.txt", argv);
}else{
    fetchAll("./users.txt");
}