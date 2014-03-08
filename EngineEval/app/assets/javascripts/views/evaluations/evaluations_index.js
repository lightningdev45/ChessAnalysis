EngineEval.Views.EvaluationsIndex = Backbone.View.extend({

  template: JST['evaluations/index'],
  tagName:"table",
  className:" table well table-hover col-lg-12 col-md-12",
  render:function(){
  	
  	$(this.el).html(this.template({evaluations:evaluations}))
  	return this

  }

});
