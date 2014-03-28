EngineEval.PositionsController=Ember.ObjectController.extend({
	actions:{
		newPosition:function(){
			
			this.get('target').transitionTo('position',encodeURIComponent(chessAnalysis.chess[index].fen()))}}
})