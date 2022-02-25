

module.exports = (usersJSON, projectsJSON, tasksJSON) => {
    let resultantArr = [];
    usersJSON.forEach( user =>{
        let objToPrint = JSON.parse(JSON.stringify(user));
        let usersProjectID = user.projects;
        
        // Work with projects
        let projectToBeAppend = [];
        projectsJSON.forEach( project => {
            
            if(usersProjectID.includes(project.ID)){
                let taskToBeAppend = [];
                tasksJSON.forEach( task => {
                    if(project.ID == task.projectID){
                        taskToBeAppend.push(task);
                    }
                });
                // console.log(taskToBeAppend)
                project.tasks = taskToBeAppend;
                projectToBeAppend.push(project);
            }
        });
        user.projects = projectToBeAppend;
        resultantArr.push(user);
        console.dir(user, { depth: 4});
    });
}   