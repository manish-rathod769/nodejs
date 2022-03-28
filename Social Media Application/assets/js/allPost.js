let likeDislike = ( pid ) => {
  $.ajax({
    url: '/like',
    method: 'POST',
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