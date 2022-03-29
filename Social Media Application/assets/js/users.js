// Validate user login form using jquery validator
if(("#user-register-form").length){
  $("#user-register-form").validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Name is required !!!"
      },
      email: {
        required: "Email is required !!!",
        email: "Please enter valid email !!!"
      },
      password: {
        required: "Password is required !!!"
      }
    }
  })
}

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