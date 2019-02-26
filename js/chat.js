$(function() {

  $("#openChatConversation").click(function() {    
    $("#openChatConversation").toggle('scale');
    $(".chatTotal").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#openChatConversation").toggle('scale');
    $(".chatTotal").toggle('scale');
  })
  
})