const yargs = require('yargs');
const argument = yargs.argv;

const approache = argument.approache;
const users = "./dataJSON/users.json";
const projects = "./dataJSON/projects.json";
const tasks = "./dataJSON/tasks.json";

const callbackApproach = require("./approaches/callback");
const promiseApproach = require('./approaches/promise');
const asyncAwaitApproach = require("./approaches/asyncAwait");

if(!["callback", "promise", "asyncAwait"].includes(approache)) {
    console.log("Please Enter valid operation !!!");
    return;
}

if(approache === "callback") {
    callbackApproach(users, projects, tasks);
}else if(approache === "promise") {
    promiseApproach(users, projects, tasks);
}else{
    console.log("Async Await operation");
    asyncAwaitApproach(users, projects, tasks);
}