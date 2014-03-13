

var annIn=function(id){


        var halfmove=parseInt(id.split("move")[1])+1;
       
        var halfmv=parseInt(id.split("var")[1].split("move")[0])
         chessAnalysis.rclickmove[index]=[halfmove,halfmv];

if(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]])
   {if(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]][chessAnalysis.rclickmove[index][0]-1])
   {window.oncontextmenu = function (event)
{
    showCustomMenu(event);
    return false;     // cancel default menu
}
}}}
var annOut=function(){
 window.oncontextmenu = function (event)
{

    return true
} 
}





var showCustomMenu=function(event){

 var x=event.pageX;
 var y=event.pageY;
 $("#rmenu").css("display","inline-block");
 $("#rmenu").css("top",y);
 $("#rmenu").css("left",x);



$("#delete-variation").click(function(){

deleteVariation();

});


$("#delete-remaining").click(function(){
deleteRemaining();

});


};
