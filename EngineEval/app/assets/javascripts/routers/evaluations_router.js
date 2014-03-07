EngineEval.Routers.Evaluations = Backbone.Router.extend({
	routes:{
		"":'index'
	},

	index:function(){

		evaluations = new EngineEval.Collections.Evaluations()
		evaluations.fetch({success:function(){
			view=new EngineEval.Views.EvaluationsIndex({collection:evaluations})
		$("#evaluations_table").html(view.render().el)}
		})
		evaluations.on("piece:drop",this.changePosition,this);
		view=new EngineEval.Views.EvaluationsIndex({collection:evaluations})
		$("#evaluations_table").html(view.render().el)
		
	},
	changePosition:function(){
	
		evaluations = new EngineEval.Collections.Evaluations()
		evaluations.fetch({success:function(){
		view=new EngineEval.Views.EvaluationsIndex({collection:evaluations})
		$("#evaluations_table").html(view.render().el)
		}
		})

		evaluations.on("piece:drop",this.changePosition,this);
		view=new EngineEval.Views.EvaluationsIndex({collection:evaluations})
		$("#evaluations_table").html(view.render().el)
		
	}
});
