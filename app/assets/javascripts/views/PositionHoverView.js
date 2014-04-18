EngineEval.PositionHoverView = Ember.View.extend({
	fen:"fen",
	mouseEnter:function(){
		setup(this.fen);
		addpieces();	
	},
	mouseLeave:function(){
		setup("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
		addpieces();		
	}
})

