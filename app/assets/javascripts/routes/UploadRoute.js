EngineEval.UploadsRoute = Ember.Route.extend({
	model:function(){
		var route=this;
		return $.getJSON("/uploads").then(function(response){
			return response.uploads
		},function(error){
			route.transitionTo("home")
			route.controllerFor("alert").send("showAlert","There was an error loading the uploads.  Please try again and/or contact support.","alert alert-danger alert-dismissable","devise-alert")	
		})
	}
})