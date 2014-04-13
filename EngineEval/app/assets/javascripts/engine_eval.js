window.EngineEval = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    chessAnalysis.evaluation_router=new EngineEval.Routers.Evaluations();
    Backbone.history.start();
    
    
  }
};


