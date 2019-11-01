//Funcion para mostrar u ocultar el panel de comentarios
$('#post-comment').hide();
$('#btn-toogle-comment').click(function (e){
  e.preventDefault();
  $('#post-comment').slideToggle();
});

// Funcion ajax para aumentar el numero e likes
$('#btn-like').click(function(e){
  e.preventDefault();
  let imgId = $(this).data('id');
  
  $.post('/images/' + imgId + '/like')
    .done(data => {
      console.log(data);
      $('.likes-count').text(data.likes);
    });
});

//funcion ajax para eliminar una imagen
$('#btn-delete').click(function(e){
  e.preventDefault();
  let $this = $(this);
  const response = confirm('Are you sure you want to delete this image?');
  if(response){
    let imgId = $this.data('id');
   
    $.ajax({
        url: '/images/' + imgId,
        type: 'DELETE'
    })
    .done(function(result){
      console.log(result);
      $this.removeClass('btn-danger').addClass('btn-success');
      $this.find('i').removeClass('fa-times').addClass('fa-check');
      //$this.append('<span>Deleted!</span>');
    });
  }
});



