EngineEval.ProfileRoute = Ember.Route.extend({
	model:function(params){	
		 return $.getJSON("/user/"+params.profile_id).then(function(data){
	      	return data
	      })	
		}
	})
