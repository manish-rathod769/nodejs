const fs = require('fs');
const readFileUsingCallback = require("../readFiles/callback");
const displayOP = require("../displayOP");

module.exports = (usersFile, projectsFile, tasksFile) => {
    let users, projects, tasks;

    readFileUsingCallback(usersFile, (err, data) => {
        if(err) console.error(err);
        users = JSON.parse(data);
        
        readFileUsingCallback(projectsFile, (err, data) => {
            if(err) console.error(err);
            projects = JSON.parse(data);
        });

        readFileUsingCallback(tasksFile, (err, data) => {
            if(err) console.error(err);
            tasks = JSON.parse(data);

            // Displaying outputs
            displayOP(users, projects, tasks);
        });
    });

}