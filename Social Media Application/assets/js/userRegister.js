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

$("#user-register-form").submit( (event) => {
  event.preventDefault();
  let userDataArr = $("#user-register-form").serializeArray();
  let userDataObj = {};
  userDataArr.forEach( arrObj => userDataObj[arrObj.name] = arrObj.value);
  
  if(!userDataObj.name || !userDataObj.email || !userDataObj.password) return;

  $.ajax({
    url:`http://localhost:8080/register`,
    method: 'POST',
    data: userDataObj
  }).done( (res) => {
    if(res.is_error){
      alert(res.message);
    }else{
      alert(res.message);
      location.reload();
    }
  });

});