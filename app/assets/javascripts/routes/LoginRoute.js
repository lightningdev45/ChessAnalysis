EngineEval.LoginRoute = Ember.Route.extend({
activate:function(){
  if(this.controllerFor("auth").get("isAuthenticated")){
    this.controllerFor("alert").send("showAlert","You are already signed in!","alert alert-warning alert-dismissable","devise-alert")
    if(chessAnalysis.chess)
      {this.transitionTo("position",encodeURIComponent(chessAnalysis.chess[0].fen()))}
      else{
        this.transitionTo("position",encodeURIComponent("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
      }
  }
},
  setupController: function(controller, model){
    controller.setProperties({
      password: "",
      errorMsg: ""
    });
    
  },
    
  actions:{
  	login: function(){
      //console.log(this.get("controller"))
      this.controllerFor("auth").login(this)	
  	},  
    cancel:function(){
      this.transitionTo('position')
    }   
  }   
})
  