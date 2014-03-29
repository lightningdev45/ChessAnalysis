EngineEval.PositionsRoute = Ember.Route.extend({
	 setupController:function(controller){
			var router=this

			if(this.modelFor('position'))
				{}
			else
				{
					$.getJSON("/positions?fen="+chessAnalysis.chess[index].fen()).then(function(response){
						chessAnalysis.signed_in=response.signed_in
					controller.set('model',{fen_param:response.fen_param})	
					router.controllerFor("evaluations").set('model',_.map(response.evaluations,function(object,key){
						var eval=EngineEval.Evaluation.create(object)
						eval.set("index",key+1)
						return eval
					}))
					router.controllerFor("tactictags").set('model',response.tags.tactics)
					router.controllerFor("tactictags").set('signed_in',response.signed_in)
					router.controllerFor("positionaltags").set('model',response.tags.positional)
					router.controllerFor("positionaltags").set('signed_in',response.signed_in)
					router.controllerFor("openingtags").set('model',response.tags.opening)
					router.controllerFor("openingtags").set('signed_in',response.signed_in)
				})}
					
			},
			renderTemplate: function() {
        // Render default outlet 
        if(document.URL==="http://0.0.0.0:3000/")
		        {this.render();}
		        // render extra outlets
		        this.render("evaluations", {
		            outlet: "evaluations",
		            into: "positions" // important when using at root level
		        });
		        this.render("tactictags", {
		            outlet: "tactictags",
		            into: "positions" // important when using at root level
		        });
		        this.render("positionaltags", {
		            outlet: "positionaltags",
		            into: "positions" // important when using at root level
		        });
		        this.render("openingtags", {
		            outlet: "openingtags",
		            into: "positions" // important when using at root level
		        });
    		}
	}) 		

	
