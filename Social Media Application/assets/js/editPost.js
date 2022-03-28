// Validate user login form using jquery validator
if(("#user-edit-post-form").length){
  $("#user-edit-post-form").validate({
    rules: {
      title: {
        required: true
      },
      description: {
        required: true
      }
    },
    messages: {
      title: {
        required: "Title is required !!!"
      },
      description: {
        required: "Descritpion is required !!!"
      }
    }
  })
}