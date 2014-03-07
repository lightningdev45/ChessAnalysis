EngineEval.Views.EvaluationsIndex = Backbone.View.extend({

  template: JST['evaluations/index'],
  tagName:"table",
  className:"table table-hover",
  render:function(){
  	
  	$(this.el).html(this.template({evaluations:evaluations}))
  	return this

  }

});
