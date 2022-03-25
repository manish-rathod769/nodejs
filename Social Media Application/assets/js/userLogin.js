// Validate user login form using jquery validator
if(("#user-login-form").length){
  $("#user-login-form").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      email: {
        required: "Email is required !!!",
        email: "Please enter valid email!!!"
      },
      password: {
        required: "Password is required !!!"
      }
    }
  })
}

$("#user-login-form").submit( (event) => {
  // event.preventDefault();
  event.returnValue = false;
  let userDataArr = $("#user-login-form").serializeArray();
  let userDataObj = {};
  userDataArr.forEach( arrObj => userDataObj[arrObj.name] = arrObj.value);

  // Check if user have entered email and password or not
  if(!userDataObj.email || !userDataObj.password) return;
  event.returnValue = true;
});