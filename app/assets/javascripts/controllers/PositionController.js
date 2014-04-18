EngineEval.PositionController=Ember.ObjectController.extend({
	needs:["evaluations","auth","alert","navbar"],
  	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
	actions:{
		newPosition:function(){
			this.get('target').transitionTo('position',encodeURIComponent(chessAnalysis.chess[index].fen()))}
		
	}
})