// const { validateInput } = require('./users.validator');

exports.registerUser = async (event) => {
  const eventBody = JSON.parse(event.body);
  console.log(eventBody);
}

