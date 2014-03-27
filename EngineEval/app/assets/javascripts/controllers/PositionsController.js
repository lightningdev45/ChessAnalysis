EngineEval.PositionsController=Ember.ObjectController.extend({
	actions:{
		newPosition:function(){
			alert("here")
			this.get('target').transitionTo('position',encodeURIComponent(chessAnalysis.chess[index].fen()))}}
})