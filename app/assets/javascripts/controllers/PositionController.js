EngineEval.PositionController=Ember.ObjectController.extend({
	needs:["evaluations","auth","alert","navbar","annotation_edits","game_input"],
  	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
	actions:{
		newPosition:function(){
			this.get('target').transitionTo('position',encodeURIComponent(chessAnalysis.chess[index].fen()))}
		
	}
})