const fetchTasks = (projectJSON, taskJSON) => {
  const projectTask = [];

  projectJSON.forEach((project) => {
    const tasks = [];

    // Fetch Tasks Details
    taskJSON.forEach((task) => {
      if (project.ID === task.projectID) {
        tasks.push(task);
      }
    });

    // eslint-disable-next-line no-param-reassign
    project.tasks = tasks;
    projectTask.push(project);
  });

  return projectTask;
};

exports.displayOP = (usersJSON, projectsJSON, tasksJSON) => {
  const result = [];
  usersJSON.forEach((user) => {
    const singleUser = user;

    // Fetch Projects Details
    const userProjects = [];
    projectsJSON.forEach((project) => {
      if (user.projects.includes(project.ID)) {
        userProjects.push(project);
      }
    });

    // Fetch Tasks of project
    singleUser.projects = fetchTasks(userProjects, tasksJSON);
    result.push(singleUser);
  });
  // return result;
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      data: result,
    }),
  };
};
