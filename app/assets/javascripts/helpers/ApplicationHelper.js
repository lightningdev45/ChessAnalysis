Ember.Handlebars.helper('eventpagination', function(paginate) {
	if(paginate[2]===1)
		{element="<ul class='pagination'><li class='disabled'><a href='#'>&laquo;</a></li>"}
	else if(paginate[0]===1){
		element="<ul class='pagination'><li class='disabled'><a href='#'>&laquo;</a></li>"
	}
	else{
		element="<ul class='pagination'><li><a href='/#/profile/"+paginate[3]+"/"+(paginate[0]-1)+"'>&laquo;</a></li>"
	}
	  for(var spot=paginate[0];spot<paginate[1]+1;spot++){
	  	if(spot==paginate[2]){
	  		element+="<li class='active'><a href='/#/profile/"+paginate[3]+"/"+spot+"'>"+spot+"</a></li>"
	  	}
	  	else{
	  		element+="<li><a href='/#/profile/"+paginate[3]+"/"+spot+"'>"+spot+"</a></li>"
	  	}
	  }
	if(paginate[1]===paginate[4])
		{element+="<li class='disabled'><a href='#'>&raquo;</a></li></ul>"}
	else{
		element+="<li><a href='/#/profile/"+paginate[3]+"/"+(paginate[1]+1)+"'>&raquo;</a></li></ul>"
	} 
	return new Handlebars.SafeString(element);
});

Ember.Handlebars.helper('evaluation_display', function(database_evaluation) {
	if(chessAnalysis.chess[index].turn()==="b"){
		console.log(database_evaluation)
		return database_evaluation*-1
	}
	else{
		return database_evaluation
	}

})

Ember.Handlebars.helper('user_search_pagination', function(paginate) {
	if(paginate[2]===1)
		{var element="<ul class='pagination'><li class='disabled'><a href='#'>&laquo;</a></li>"}
	else if(paginate[0]===1){
		var element="<ul class='pagination'><li class='disabled'><a href='#'>&laquo;</a></li>"
	}
	else{
		var element="<ul class='pagination'><li><a href='/#/user_serach/"+(paginate[0]-1)+"'>&laquo;</a></li>"
	}
	  for(var spot=paginate[0];spot<paginate[1]+1;spot++){
	  	if(spot==paginate[2]){
	  		element+="<li class='active'><a href='/#/user_search/"+spot+"'>"+spot+"</a></li>"
	  	}
	  	else{
	  		element+="<li><a href='/#/user_search/"+spot+"'>"+spot+"</a></li>"
	  	}
	  }
	if(paginate[1]===paginate[3])
		{element+="<li class='disabled'><a href='#'>&raquo;</a></li></ul>"}
	else{
		element+="<li><a href='/#/user_search/"+(paginate[1]+1)+"'>&raquo;</a></li></ul>"
	} 
	return new Handlebars.SafeString(element);
});



Ember.Handlebars.helper('follow_user_button', function(id,current_user_id,isAuthenticated,isFollowed) {
	if(isAuthenticated)
		{if(id===current_user_id)
			{
				return new Handlebars.SafeString("<a class='btn btn-primary disabled'>Follow</a>")
			}
		else{if(isFollowed){
			return new Handlebars.SafeString("<form data-remote='true' name='change_relationship' action='change_relationship' method='post'><input type='hidden' value='"+current_user_id+"' name='follower'><input type='hidden' value='"+id+"' name='followed'><input type='submit' value='Unfollow' id='follow-user-button"+id+"' class='btn btn-primary'></form>")	}
			else{
				return new Handlebars.SafeString("<form data-remote='true' name='change_relationship' action='change_relationship' method='post'><input type='hidden' value='"+current_user_id+"' name='follower'><input type='hidden' value='"+id+"' name='followed'><input type='submit' value='Follow' id='follow-user-button"+id+"' class='btn btn-primary'></form>")
			}
		}}
	else
	{return "hello"

		}
});

Ember.Handlebars.helper('element_id',function(text,id){
	return new Handlebars.SafeString("<td id='"+text+id+"'>")
});

Ember.Handlebars.helper('game_input_move',function(move,index){
	if(index%2==0)
		{return new Handlebars.SafeString("<span id='game_input_move"+index+"' class='game_input_move'>"+(index/2+1)+". "+move+"</span>")}
	else{
		return new Handlebars.SafeString("<span id='game_input_move"+index+"' class='game_input_move'> "+move+"</span>")
	}
});