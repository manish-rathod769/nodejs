const fs = require('fs');

const { readFileUsingCallback, readFileUsingPromise, readFileUsingAsyncAwait } = require('./readFiles');
const displayOP = require('./displayOP');

let callbackApproach = (usersFile, projectsFile, tasksFile) => {
  let users, projects, tasks;

  readFileUsingCallback(usersFile, (err, data) => {
    if(err) console.error(err);
    users = JSON.parse(data);
        
    readFileUsingCallback(projectsFile, (err, data) => {
      if(err) console.error(err);
      projects = JSON.parse(data);

      readFileUsingCallback(tasksFile, (err, data) => {
        if(err) console.error(err);
        tasks = JSON.parse(data);

        // Displaying outputs
        displayOP(users, projects, tasks);
      });
    });
  });
}

let promiseApproach = (file1, file2, file3) => {
  let usersJSON = {}, projectsJSON = {}, tasksJSON = {};

  readFileUsingPromise(file1).then( data => {
    usersJSON = JSON.parse(data);
    return readFileUsingPromise(file2);
  }).then( data => {
    projectsJSON = JSON.parse(data);
    return readFileUsingPromise(file3);
  }).then( data => {
    tasksJSON = JSON.parse(data);
    displayOP(usersJSON, projectsJSON, tasksJSON);
  }).catch(err => {
    console.log(new Error(err));
  });

  // Promise.all([
  //     readFileUsingPromise(file1),
  //     readFileUsingPromise(file2),
  //     readFileUsingPromise(file3)  
  // ]).then( filesDataStr => {
  //     const usersJSON = JSON.parse(filesDataStr[0]);
  //     const projectsJSON = JSON.parse(filesDataStr[1]);
  //     const tasksJSON = JSON.parse(filesDataStr[2]);
  //     displayOP(usersJSON, projectsJSON, tasksJSON);
  // })
  // .catch(err => console.log(new Error(err)))
}

let asyncAwaitApproach = async (userFile, projectFile, taskFile) => {
  let users = await readFileUsingAsyncAwait(userFile);
  let projects = await readFileUsingAsyncAwait(projectFile);
  let tasks = await readFileUsingAsyncAwait(taskFile);

  displayOP(JSON.parse(users), JSON.parse(projects), JSON.parse(tasks));
}

module.exports = {
  callbackApproach,
  promiseApproach,
  asyncAwaitApproach
}