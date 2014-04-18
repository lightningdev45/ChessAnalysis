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
      if(chessAnalysis.chess)
      {this.transitionToRoute("position",encodeURIComponent(chessAnalysis.chess[0].fen()))}
      else{
        this.transitionToRoute("position",encodeURIComponent("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
      }
    }
      
  }
    
})
  