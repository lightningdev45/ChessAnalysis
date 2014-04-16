EngineEval.UserSearchRoute = Ember.Route.extend({
	model:function(params){
		var route=this;
		$(".panel-body").css("opacity", 0);
		$(".panel-body").fadeTo(500,1);
		return $.getJSON("/user_search?page="+params.page+"&search="+route.controllerFor("profile").get("search")).then(function(response){	
			return response
		},function(error){
			route.controllerFor("alert").send("showAlert","There was an error.  Please try again.","alert alert-warning alert-dismissable","devise-alert")
			route.transitionTo("profile",route.controllerFor("auth").currentUser.id,"1")
		})
	}
})