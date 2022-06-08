const USER = 'Users';
const PROJECT = 'Projects';
const TASK = 'Tasks';
const userKeys = ['fullName', 'emailID', 'department', 'designation', 'technologiesKnown', 'projects'];
const projectKeys = ['title', 'description'];
const taskKeys = ['title', 'description', 'projectID'];

module.exports = {
  USER, PROJECT, TASK, userKeys, projectKeys, taskKeys,
};
