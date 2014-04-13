EngineEval.EditRoute = Ember.Route.extend({

  setupController: function(controller, model){
    if( this.controllerFor("auth").get("isAuthenticated"))
      {controller.set("model",this.controllerFor("auth").get("currentUser"))}
    else{
      this.transitionTo("login")
    }

  
    
  },
 
  actions:{
  	edit: function(){
  	console.log("Editing")
      this.controllerFor("auth").edit(this)	
  	},  
    cancel:function(){
    	console.log("cancelling login")
      this.transitionTo('positions')
    }   
  }   
})