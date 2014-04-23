EngineEval.PositionRoute = Ember.Route.extend({
 activate:function(){
 	chessAnalysis.mode="engine_analysis_mode";
 	chessAnalysis.editStatus[1]=false;
 	console.log("not edited")
 	index=0;
 	$("#evaluations_table").css("opacity",0)
 	$("#evaluations_table").fadeTo(500,1)
 },
 model: function(params) {
 	if(chessAnalysis.chess){
	 	}
	else{
	 	setupChess(decodeURIComponent(params.fen_param))
	 	}
	 	console.log(params)
	return {fen_param:params.fen_param};
  },

  serialize: function(model) {

    return { fen_param: model.get('slug') };
  },
		setupController:function(controller,model){
			console.log("boo")
			var router=this
			var fen_param=this.modelFor('position').fen_param
				$.getJSON("/positions?fen="+this.modelFor('position').fen_param).then(function(response){
					controller.set('model',{fen_param:response.fen_param})
					router.store.unloadAll("evaluation")
					router.controllerFor("evaluations").set('model',_.map(response.evaluations,function(object,key){
						var eval=object
						eval.index=key+1
						if(decodeURI(fen_param).split(" ")[1]==="b")
							{eval.evaluation=eval.evaluation*-1}
						var evaluation=router.store.createRecord("evaluation",eval)
						return evaluation
					}))
					router.controllerFor("evaluations").set("currentPage",1)
					router.controllerFor("evaluations").set("model_length",response.length)
					router.controllerFor("tactictags").set('model',response.tags.tactics)
					router.controllerFor("tactictags").set('signed_in',response.signed_in)
					router.controllerFor("positionaltags").set('model',response.tags.positional)
					router.controllerFor("positionaltags").set('signed_in',response.signed_in)
					router.controllerFor("openingtags").set('model',response.tags.opening)
					router.controllerFor("openingtags").set('signed_in',response.signed_in)
				})
			
					
			},
			renderTemplate: function() {
		         this.render();

		        this.render("evaluations", {
		            outlet: "evaluations",
		            into: "position" 
		        });
		        this.render("tactictags", {
		            outlet: "tactictags",
		            into: "position" 
		        });
		        this.render("positionaltags", {
		            outlet: "positionaltags",
		            into: "position" 
		        });
		        this.render("openingtags", {
		            outlet: "openingtags",
		            into: "position" 
		        });
		        this.render("annotation_edits", {
		            outlet: "annotation_edits",
		            into: "position" 
		        });
		        this.render("game_input", {
		            outlet: "game_input",
		            into: "position" 
		        });
    		}
    })