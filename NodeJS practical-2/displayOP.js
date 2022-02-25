

module.exports = (usersJSON, projectsJSON, tasksJSON) => {
    let resultantArr = [];
    usersJSON.forEach( user =>{
        let objToPrint = JSON.parse(JSON.stringify(user));
        let usersProjectID = user.projects;
        
        // Work with projects
        let projectToBeAppend = [];
        projectsJSON.forEach( project => {
            let projectObj = {};
            if(usersProjectID.includes(project.ID)){
                projectObj.ID = project.ID;
                projectObj.title = project.title;
                projectObj.description = project.description;
                // Wotk with tasks 
                let taskToBeAppend = [];
                tasksJSON.forEach( task => {
                    if(project.ID == task.projectID){
                        taskToBeAppend.push(task);
                    }
                });
                projectObj.tasks = taskToBeAppend;
                projectToBeAppend.push(projectObj);
            }
        });
        user.projects = projectToBeAppend;
        resultantArr.push(user);
    });
    resultantArr.forEach( rec => {
        console.log(JSON.parse(JSON.stringify(rec)));
    });
}