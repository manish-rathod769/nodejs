const fs = require('fs');
const readFileUsingAsyncAwait = require('../readFiles/asyncAwait');
const displayOP = require('../displayOP');

module.exports = async (userFile, projectFile, taskFile) => {
    let users = await readFileUsingAsyncAwait(userFile);
    let projects = await readFileUsingAsyncAwait(projectFile);
    let tasks = await readFileUsingAsyncAwait(taskFile);

    displayOP(JSON.parse(users), JSON.parse(projects), JSON.parse(tasks));
}