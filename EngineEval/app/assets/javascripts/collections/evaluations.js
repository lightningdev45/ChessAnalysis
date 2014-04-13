EngineEval.Collections.Evaluations = Backbone.Collection.extend({

  url: function(){
  	return '/api/evaluations/?fen='+chessAnalysis.chess[index].fen()
  }

});
