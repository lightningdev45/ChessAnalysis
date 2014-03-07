window.EngineEval = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new EngineEval.Routers.Evaluations();
    Backbone.history.start();
    
    
  }
};


