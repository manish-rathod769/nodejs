// Validate user login form using jquery validator
if(("#user-add-post-form").length){
  $("#user-add-post-form").validate({
    rules: {
      image: {
        required: true
      },
      title: {
        required: true
      },
      description: {
        required: true
      }
    },
    messages: {
      image: {
        required: "Image is required !!!"
      },
      title: {
        required: "Title is required !!!"
      },
      description: {
        required: "Description is required !!!"
      }
    }
  })
}