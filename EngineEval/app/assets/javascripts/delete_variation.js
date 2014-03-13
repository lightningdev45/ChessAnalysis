var deleteVariation=function(){
//alert(Object.keys(children).length)

  var deletePosition=generatePosition(rclickmove[1],rclickmove[0])
 var deleteChess=new Chess();
 var deleteHistory=[];
 for(var move=0;move<moves[rclickmove[1]].length;move++)
  {deleteChess.move(moves[rclickmove[1]][move])
    deleteHistory.push(deleteChess.fen())}

  action_groups+=1
  file_actions[action_groups]=["delete"]
    for(var i=0;i<moves[rclickmove[1]].length;i++)
  {file_actions[action_groups][i+1]=[rclickmove[1],i+1,moves[rclickmove[1]][i],deleteHistory[i],deleteHistory[i-1]||startpositionfen]}
  action_groups+=1
  file_actions[action_groups]=["add"]
  savedStatus=false

  $("#rmenu").css("display","none");
  var deletedParents=parents[rclickmove[1]];
  


  var deletedChildren=children[rclickmove[1]];
  var oldChildren={};
  _.each(children,function(value,key){
  oldChildren[key]=value;
});
  delete moves[rclickmove[1]];

  delete parents[rclickmove[1]]
  delete movescomment[rclickmove[1]];
  dropcount+=1;
  hm=0;
  hmv=0;
  atStart=true;
  numvariations-=1;
  var newmainvariations=[];
  var newmoves=[];

  var newparents=[];
  var newmovescomment=[];
  var newchildren={};



  _.each(children,function(value,key){
 

  if(key==rclickmove[1])
  {newchildren[key]=[];}
  else
  {var tempchildren=[];
  _.each(value,function(element,index){
 
 
  if(element[0]==rclickmove[1])
    {}
    else
    {if (element[0]<rclickmove[1])
    {tempchildren.push(element)}
    else
    {
    tempchildren.push([element[0]-1,element[1]])
    
   }
    }

    })

    if(key<rclickmove[1])
    {newchildren[key]=tempchildren}
    else if(key>rclickmove[1])
    {
    newchildren[key-1]=tempchildren}
    }
});
children=newchildren;



  _.each(mainvariations,function(element,index){
  if(element===rclickmove[1])
  {}
  else
  {if(element<rclickmove[1])

    {newmainvariations.push(element);
  }
    else
    {newmainvariations.push(element-1);
  }
  } 

});
var newCount=0;
_.each(moves,function(element,index){
if(element)
{newmoves.push(element)}});
moves=newmoves;


_.each(parents,function(element,index){
if(element[0]<rclickmove[1])
{newparents.push(element)}
else if(element[0]>rclickmove[1])
{newparents.push([element[0]-1,element[1]])
}
else if(element[0]==rclickmove[1])
{newparents.push(["a"])
newCount+=1;
  
}
else{
  
}

});
parents=newparents;



_.each(movescomment,function(element,index){
if(element)
{newmovescomment.push(element)}});
movescomment=newmovescomment;

mainvariations=newmainvariations;


if(_.some(deletedChildren))
{upgradeVariation(rclickmove[1],deletedParents,deletedChildren,oldChildren);}

mainvariations.sort();


   chess.load(startpositionfen);

      
        setup(chess.fen());
      
       addpieces(); 
       movegen();
      drag();
       drop();
       if(navigationType==="Opening Explorer")
       {document.getElementById('analysis-iframe').contentWindow.sync(generatePosition(hmv,hm));} 
       
       
       writemove(hm,hmv,false);
   

       //search(dropcount);
       //$("#comment-input").val(movescomment[hmv][hm]);
   





currentHighlighted.css("background-color","white");
    $("#row"+String(_.indexOf(sortlist,hmv))+"col"+(hm-1)).css("background-color","yellow");
    currentHighlighted=$("#row"+String(_.indexOf(sortlist,hmv))+"col"+(hm-1));

$("#delete-remaining").unbind("click"); 
 $("#delete-variation").unbind("click");
 $("#replay-variation").unbind("click");
  $("#make-critical").unbind("click");

  if(parents.length!==moves.length)
    {alert(parents.length)
      alert(moves.length)}
 alert(children[0].length);
 var parentcount=0;
 _.each(parents,function(element,index){
  if(element[0]===0)
  {parentcount+=1} 
 })
 alert(parentcount)
   
  }
