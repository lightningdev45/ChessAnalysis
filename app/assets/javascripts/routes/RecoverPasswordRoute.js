EngineEval.RecoverPasswordRoute=Ember.Route.extend({
	actions:{
	send_recover_email:function(){
	 console.log("Sending recover email...") 
     this.controllerFor("auth").recover_password(this)
	}
     
}
})