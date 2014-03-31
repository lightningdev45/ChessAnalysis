EngineEval.LoginRoute = Ember.Route.extend({

  setupController: function(controller, model){
  
    controller.set("errorMsg", "")
    controller.setProperties({
      password: "",
      errorMsg: ""
    });
  
    
  },
    
  actions:{
  	login: function(){
  	console.log("Logging in...")

      this.controllerFor("auth").login(this)	
  	},  
    cancel:function(){
    	console.log("cancelling login")
      this.transitionTo('positions')
    }   
  }   
})
  