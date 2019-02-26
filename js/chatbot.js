// Backend URL.
var apiUrl = "api/api.php";
// Variable for the conversation state.
var context = "";

$(function(){
  // Initialization of the chatbot.
  chatbot("");
  
  // Send a Message, When the form will be submitted.
  $("form").submit(function(e){
    // alert('getting reply');
    // Prevent the form submission.
    e.preventDefault();
    if($("input").val()){

      $("#quesiton").prop('disabled', true);
      $("#submit").prop('disabled', true);

      // Send the message.
      chatbot($("input").val());
      // Display the message.
      $('.chatConversation').append('<!-- User message --><div class=""><div class="col-md-2 col-xs-2 paddingNone pull-right"><img src="img/user.png" class="img img-responsive" width="48" /></div><div class="col-md-8 col-xs-9 chatDefault userreplyBG pull-right positionRel"><i class="fa fa-caret-right fw fa-2x userreplyicon"></i><div class="message">'+$("input").val()+'</div></div><div class="clearfix"></div><br/></div><!-- /User message -->');
    }
  })
})

// A function for sending message to the backend and getting result.
function chatbot(message){
  $.ajax({
    url: apiUrl,
    type: 'post',
    dataType: 'json',
    data: {
      message: message,
      context: context
    },
    timeout:10000
  }).done(function (response) {
    // Check the result.
    console.log(response);
    if(response.error){
      // Failed at getting result.
      // Display a error message.
      $('.chatConversation').append('<!-- Machine message --><div class=""><div class="col-md-2 col-xs-2 paddingNone"><img src="img/mascut.png" class="img img-responsive" width="48" /></div><div class="col-md-8 col-xs-9 chatDefault machinereplyBG positionRel"><i class="fa fa-caret-left fw fa-2x machinereplyicon"></i><div class="message">A communication error occurred.</div></div><div class="clearfix"></div><br/></div><!-- /Machine message -->');
    }else{
      // Succeeded at getting result.
      // Clear the input element.
      $("input").val("");
      // Display the message.
      $('.chatConversation').append('<!-- Machine message --><div class=""><div class="col-md-2 col-xs-2 paddingNone"><img src="img/mascut.png" class="img img-responsive" width="48" /></div><div class="col-md-8 col-xs-9 chatDefault machinereplyBG positionRel"><i class="fa fa-caret-left fw fa-2x machinereplyicon"></i><div class="message">'+JSON.parse(response).output.text+'</div></div><div class="clearfix"></div><br/></div><!-- /Machine message -->');
      // Upodate the conversation state.
      context = JSON.stringify(JSON.parse(response).context);

      // $('.chat-box').animate({ scrollTop: $('#chat-boxEnd').offset().top }, 'slow');
      $(".chat-box").stop().animate({ scrollTop: $(".chat-box")[0].scrollHeight}, 1000);

      $("#quesiton").prop('disabled', false);
      $("#submit").prop('disabled', false);

      $("#quesiton").focus();

    }
  }).fail(function () {
    // Display a error message.
    $('.chatConversation').append('<!-- Machine message --><div class=""><div class="col-md-2 col-xs-2 paddingNone"><img src="img/mascut.png" class="img img-responsive" width="48" /></div><div class="col-md-8 col-xs-9 chatDefault machinereplyBG positionRel"><i class="fa fa-caret-left fw fa-2x machinereplyicon"></i><div class="message">A communication error occurred.</div></div><div class="clearfix"></div><br/></div><!-- /Machine message -->');
  });
}