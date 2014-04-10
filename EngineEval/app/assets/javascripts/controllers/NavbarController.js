EngineEval.NavbarController = Ember.ObjectController.extend({
	needs: ['auth'],
  isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
  currentUser: Em.computed.alias("controllers.auth.currentUser"),
  actions:{
  	logout:function(){
  		console.log("NavbarController handling logout event...")
      this.get("controllers.auth").logout()
  	},
  	edit:function(){
  		alert("edit")
  	},
    viewFen:function(){
      this.transitionToRoute("position",encodeURIComponent(chessAnalysis.chess[0].fen()))
    }
      
  }
    
})
  