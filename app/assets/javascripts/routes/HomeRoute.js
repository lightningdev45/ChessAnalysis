EngineEval.HomeRoute=Ember.Route.extend({
	actions:{
		save_email:function(){
			var route=this;
			$.ajax({
				url:"/interest_emails",
				method:"POST",
				data:{email:route.get("controller").get("email")},
				success:function(data){
					route.controller.set("email","")
					route.controllerFor("alert").send("showAlert","You have successfully submitted your email.  We will notify you when the site is ready.","alert alert-success alert-dismissable","devise-alert")
				},
				error:function(data){
					route.controllerFor("alert").send("showAlert","There was an error.  Please resubmit your email.","alert alert-danger alert-dismissable","devise-alert")
				}
			})
		}
	}
})