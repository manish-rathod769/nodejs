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

// Validate user login form using jquery validator
if(("#user-edit-post-form").length){
  $("#user-edit-post-form").validate({
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

let likeDislike = ( pid ) => {
  $.ajax({
    url: '/posts',
    method: 'PUT',
    data: { pid }
  })
  .done( res => {
    $(`#${pid}_count`).html(`&nbsp;${res.likeCount.count}`);
    if(res.isLiked){
      $(`#${pid}_icon`).addClass('fa-solid');
      $(`#${pid}_icon`).removeClass('fa-regular');
    }else{
      console.log('Disliked');
      $(`#${pid}_icon`).addClass('fa-regular');
      $(`#${pid}_icon`).removeClass('fa-solid');
    }
  });
}

let deletePost = (pid) => {
  $.ajax({
    url: '/posts',
    method: 'delete',
    data: { pid }
  })
  .done( (res) => {
    if(res.isDeleted){
      window.location.reload();
    }else{
      alert(res.error);
    }
  })
}