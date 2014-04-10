EngineEval.ProfileEventsController = Ember.ObjectController.extend({
	actions:{
		viewFen:function(fen,urifen){
			setupChess(fen);
			this.transitionToRoute("position",urifen)
		}
	}
})