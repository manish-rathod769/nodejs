const fs = require('fs');
const readFileUsingPromise = require('../readFiles/promise');
const displayOP = require('../displayOP');

module.exports = (file1, file2, file3) => {
    Promise.all([
        readFileUsingPromise(file1),
        readFileUsingPromise(file2),
        readFileUsingPromise(file3)  
    ]).then( filesDataStr => {
        const usersJSON = JSON.parse(filesDataStr[0]);
        const projectsJSON = JSON.parse(filesDataStr[1]);
        const tasksJSON = JSON.parse(filesDataStr[2]);
        displayOP(usersJSON, projectsJSON, tasksJSON);
    })
    .catch(err => console.log(new Error(err)))
}



