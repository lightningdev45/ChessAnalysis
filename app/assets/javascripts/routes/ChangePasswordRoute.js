EngineEval.ChangePasswordRoute = Ember.Route.extend({

actions:{
	change_password:function(){
		 console.log("Changing Password...") 
     this.controllerFor("auth").change_password(this)
	}
     
}
    

})