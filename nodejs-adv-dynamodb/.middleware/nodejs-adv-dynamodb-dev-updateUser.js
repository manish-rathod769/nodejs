'use strict';
    
const src_controller_users_users_validator = require('../src/controller/users/users.validator');
const src_controller_users_users_controller = require('../src/controller/users/users.controller');

module.exports.handler = async (event, context) => {
  let end = false;
  context.end = () => end = true;

  const wrappedHandler = handler => prev => {
    if (end) return prev;
    context.prev = prev;
    return handler(event, context);
  };

  return Promise.resolve()
    .then(wrappedHandler(src_controller_users_users_validator.updateUserValidation.bind(src_controller_users_users_validator)))
    .then(wrappedHandler(src_controller_users_users_controller.updateUser.bind(src_controller_users_users_controller)));
};