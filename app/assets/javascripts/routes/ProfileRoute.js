EngineEval.ProfileRoute = Ember.Route.extend({
	model:function(params){	
		$("#followers_list").modal('hide');
		$("#followed_list").modal('hide');
		
		$("#user-profile-actions .panel-body").css("opacity", 0);
		$("#user-profile-actions .panel-body").fadeTo(500,1);
		 return $.getJSON("/user/"+params.profile_id+"?events_id="+params.events_id).then(function(data){
		 	var response=data
		 	_.each(data.events,function(item,index){
	      			response.events[index].urifen=encodeURIComponent(item.fen)
	      			response.events[index].profile_name=response.user.profile_name
	      	})
	      	return response
	      })	
		},
		setupController:function(controller,model){
		controller.set("model",model)

		}
	

	})
