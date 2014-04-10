EngineEval.RegisterRoute = Ember.Route.extend({

actions:{
	register:function(){
		 console.log("Registering...") 
     this.controllerFor("auth").register(this)
	}
     
}
    

})