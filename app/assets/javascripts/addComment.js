var addCommentBefore=function(){
	var hm=chessAnalysis.rclickmove[index][0]
	
	var hmv=chessAnalysis.rclickmove[index][1]
	if(document.contains(document.getElementById("var"+hmv+"comment"+(hm-1))))
		{$("#delete-remaining")
	        .unbind("click");
	    $("#delete-variation")
	        .unbind("click");
	    $("#add-comment-before")
	        .unbind("click");
	    $("#add-comment-after")
	        .unbind("click");
	    $("#rmenu")
	        .css("display", "none");
	    $(".javascript-alert.alert-danger").show()
		$(".javascript-alert.alert-danger").append("<p>That move already has a comment before it.</p>")
		setTimeout(function(){
			$(".javascript-alert.alert-danger").fadeOut('slow')
			$(".javascript-alert.alert-danger p").remove()
		},5000)
		}
	else{
		$("#var"+hmv+"move"+(hm-1)).before("<textarea class='ann_comment' rows='1' id='var"+hmv+"comment"+(hm-1)+"'></textarea>")
		$("#var"+hmv+"comment"+(hm-1)).css("max-width",$("#annotation_moves").width())
		$("#var"+hmv+"comment"+(hm-1)).on('input',function(){
			chessAnalysis.editStatus[index]=true;
			var id=$(this).attr("id")
			$(this).width(getWidthOfInput(document.getElementById(id)))
			//if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
			//{
				$(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
			//}
			chessAnalysis.movescomment[index][hmv][hm-1]=$(this).val()
		})	
		
		$("#delete-remaining")
	        .unbind("click");
	    $("#delete-variation")
	        .unbind("click");
	    $("#add-comment-before")
	        .unbind("click");
	    $("#add-comment-after")
	        .unbind("click");
	    $("#rmenu")
	        .css("display", "none");
	    $("#var"+hmv+"comment"+(hm-1)).focus()
		}
}

var addCommentAfter=function(){
	var hm=chessAnalysis.rclickmove[index][0]
	var hmv=chessAnalysis.rclickmove[index][1]

	if(document.contains(document.getElementById("var"+hmv+"comment"+(hm))))
		{$("#delete-remaining")
	        .unbind("click");
	    $("#delete-variation")
	        .unbind("click");
	    $("#add-comment-before")
	        .unbind("click");
	    $("#add-comment-after")
	        .unbind("click");
	    $("#rmenu")
	        .css("display", "none");
	    $(".javascript-alert.alert-danger").show()
		$(".javascript-alert.alert-danger").append("<p>That move already has a comment after it.</p>")
		setTimeout(function(){
			$(".javascript-alert.alert-danger").fadeOut('slow')
			$(".javascript-alert.alert-danger p").remove()
		},5000)
		}
	else{
		$("#var"+hmv+"move"+(hm-1)).after("<textarea class='ann_comment' rows='1' id='var"+hmv+"comment"+(hm)+"'></textarea>")
		$("#var"+hmv+"comment"+(hm)).css("max-width",$("#annotation_moves").width())
		$("#var"+hmv+"comment"+(hm)).on('input',function(){
			var id=$(this).attr("id")
			chessAnalysis.editStatus[index]=true;
			$(this).width(getWidthOfInput(document.getElementById(id)))
			//if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
			//{
				$(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
			//}
			chessAnalysis.movescomment[index][hmv][hm]=$(this).val()
		})	
		
		$("#delete-remaining")
	        .unbind("click");
	    $("#delete-variation")
	        .unbind("click");
	    $("#add-comment-before")
	        .unbind("click");
	    $("#add-comment-after")
	        .unbind("click");
	    $("#rmenu")
	        .css("display", "none");
	    $("#var"+hmv+"comment"+(hm)).focus()
		}
}

var addCommentBlank=function(){
		var hm=0
		var hmv=0
		$("#annotation_moves").append("<textarea class='ann_comment' rows='1' id='var0comment0'></textarea>")
		$("#var0comment0").css("max-width",$("#annotation_moves").width())
		$("#var0comment0").on('input',function(){
			chessAnalysis.editStatus[index]=true;
			var id=$(this).attr("id")
			$(this).width(getWidthOfInput(document.getElementById(id)))
			//if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
			//{
				$(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
			//}
			chessAnalysis.movescomment[index][0][0]=$(this).val()
		})	
		
	    $("#add-comment-blank")
	        .unbind("click");
	    $("#rmenu-blank")
	        .css("display", "none");
	    $("#var0comment0").focus()
}