EngineEval.UserSearchRoute = Ember.Route.extend({
	model:function(params){
		var route=this;
		return $.getJSON("/user_search?page="+1+"&search="+route.controllerFor("profile").get("search")).then(function(response){	
			return response
		},function(error){
			route.controllerFor("alert").send("showAlert","There was an error.  Please try again.","alert alert-warning alert-dismissable","devise-alert")
			route.transitionTo("profile.events",route.controllerFor("auth").currentUser.id,"1")
		})
	}
})