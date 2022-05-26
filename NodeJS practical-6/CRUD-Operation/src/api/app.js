const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const projectsRoutes = require('../routes/projects.route');
const tasksRoutes = require('../routes/tasks.route');
const usersRoutes = require('../routes/users.route');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/projects', projectsRoutes);
app.use('/tasks', tasksRoutes);

module.exports.handler = serverless(app);
