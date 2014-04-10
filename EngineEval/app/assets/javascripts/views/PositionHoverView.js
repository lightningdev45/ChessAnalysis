EngineEval.PositionHoverView = Ember.View.extend({
	fen:"fen",
	mouseEnter:function(){
		setup(this.fen);
		addpieces();	
	},
	mouseLeave:function(){
		setup(chessAnalysis.startpositionfen[0])		
	}
})

