EngineEval.PositionController=Ember.ObjectController.extend({
	needs:["evaluations"],
	actions:{
		newPosition:function(){
			this.get('target').transitionTo('position',encodeURIComponent(chessAnalysis.chess[index].fen()))}
		
	}
})