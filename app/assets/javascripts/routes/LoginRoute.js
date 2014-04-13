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
      this.controllerFor("auth").login(this)	
  	},  
    cancel:function(){
    	console.log("cancelling login")
      this.transitionTo('positions')
    }   
  }   
})
  