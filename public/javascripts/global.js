$(document).ready(function(){

  var paintBrush = '*';
  var returnFocus= false;
  var artBox = "";
  var brothers ='';
  var old;
  var hoverToPaint = false;

  function switchPaint(){
    if(returnFocus==false){
    var inputString = $('#allOfIt').html();
    var lastChar = inputString.charAt(0);
    if(inputString !== '&nbsp;'){
    paintBrush = lastChar;
    $('#allOfIt').html(lastChar);
    $('#allOfIt').removeClass('warning').addClass('paints');
  }else{
    paintBrush = $('#allOfIt').html();
  }
    $('h1').focus();
    $('#allOfIt').focus();
  }
  }

  $('#allOfIt').focus();
  $('#allOfIt').html(paintBrush);
  $('#fileLink').hide();

  $('div .gridBlock').hover(function(){
    var myClass = $(this).attr('class');
    brothers= myClass.split(' ');
    $('#feedBack').text(brothers[2] + '\n' + brothers[3]);
    $('.' + brothers[2]).addClass('hovered');
    $('.' + brothers[3]).addClass('hovered');
  },
  function(){
    $('.' + brothers[2]).removeClass('hovered');
    $('.' + brothers[3]).removeClass('hovered');
  });

  $('#fileName').click(function(){
    returnFocus = true;
    $(this).html('.txt');
    $(this).focus();
  }).focusout(function(){
    returnFocus = false;
    $('#allOfIt').focus();
  });

  $('html').mousedown(function(){
    $('#hoverToPaint').click();
  }).mouseup(function(){
    $('#hoverToPaint').click();
  });

  $('html').keyup(function(e){
    if(returnFocus==false){
    if((e.which>47 && e.which<91)||(e.which>185 && e.which<223)||(e.which == 32)){
      if(e.which == 32){
        paintBrush = '&nbsp;';
        $('#allOfIt').addClass('warning').removeClass('paints');
        $('#allOfIt').html(paintBrush);
      }
    $('#allOfIt').focus();
    switchPaint();}
  }
  }).keydown(function(e){
    if(returnFocus==false){
    if(e.which == 13||e.which == 9||e.which == 32){
      e.preventDefault();
    }
  }
  });

  $('#hoverToPaint').click(function(){
    //if($(this).prop('checked')){
    if($(this).html() == '|| N ||'){
      $(this).html('|| Y ||');
      $(this).addClass('warning');
      hoverToPaint = true;
      $('#allOfIt').focus();
    } else {
      $(this).html('|| N ||');
      $(this).removeClass('warning');
      hoverToPaint = false;
      $('#allOfIt').focus();
    }
  });

  $('#saveBtn').hover(function(){
    $('#saveArt').addClass('saveIt');
  }, function(){
    $('#saveArt').removeClass('saveIt');
  });

  $('#saveBtn').click(function(){
    var gridRows = $('.gridRow').length;
    artBox = 'Created using ascii Paintr - by Michael White | Created on: ' + new Date() + '\n';
    for(var i = 1; i <= gridRows; i++){
      artBox = artBox + $('#row'+i).text() + '\n';
    }
    var fileName = $('#fileName').html();
            var letterArt = {
                fileName: fileName,
                bodyText: artBox
            }
            // Use AJAX to post the file to a server side script that saves the file.
            $.ajax({
                type: 'POST',
                data: letterArt,
                url: '/save',
                dataType: 'JSON'
            }).done(function( response ) {
                if (response.msg === '') {

                }
                else {
                    // If something goes wrong, alert the error message that our service returned
                    alert('Error: ' + response.msg);
                }
            });
      //Offer the user the chance to download the file they made.
    $('#fileLink').html('<a href=\'/download?fileName=' + fileName + '\'> --->Download Your File<--- </a>').show();
    });


  $('.pixelz').click(function(){
    var $this = $(this);
    $this.html(paintBrush);
    old = paintBrush;
  });

  $(".pixelz").hover(function(){
    //first tell me what was in the grid you hovered on
       old = $(this).html();
       $(this).html(paintBrush);
    },
    //when exiting hover test to see if we should restore grid spot
    function(){
    if (hoverToPaint !== true){
        if(old=='&nbsp;'){
          $(this).html('&nbsp;');
        }else if(old=='&amp;'){
          $(this).html('&amp;');
        }else{
          $(this).html(old);
        }
      }else{
      $(this).html(paintBrush);
      }
  });

//end of the document ready statement
});
