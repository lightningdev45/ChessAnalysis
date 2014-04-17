

var annIn=function(id,empty){

  var halfmove=parseInt(id.split("move")[1])+1;  
  var halfmv=parseInt(id.split("var")[1].split("move")[0])
  chessAnalysis.rclickmove[index]=[halfmove,halfmv];
if(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]])
   {if(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]][chessAnalysis.rclickmove[index][0]-1])
   {window.oncontextmenu = function (event,empty)
{
    showCustomMenu(event,empty);
    return false; 
}
}}
else if(empty){
    window.oncontextmenu = function (event)
  {
      showCustomMenu(event,empty);
      return false;   
  }
}
}
var annOut=function(){
 window.oncontextmenu = function (event)
{

    return true
} 
}





var showCustomMenu=function(event,empty){


 var x=event.pageX;
 var y=event.pageY;

if(empty){
  $("#rmenu-blank").css("display","inline-block");
    $("#rmenu-blank").css("top",y);
    $("#rmenu-blank").css("left",x);
  $("#add-comment-blank").click(function(){
    addCommentBlank();
  });
}
else{
   $("#rmenu").css("display","inline-block");
    $("#rmenu").css("top",y);
    $("#rmenu").css("left",x);
  $("#delete-variation").click(function(){
    deleteVariation();
  });
  $("#delete-remaining").click(function(){
    deleteRemaining();
  });
  $("#add-comment-after").click(function(){
    addCommentAfter();
  });

  $("#add-comment-before").click(function(){
    addCommentBefore();
  });
}




};
