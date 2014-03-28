EngineEval.PositionRoute = Ember.Route.extend({
 model: function(params) {
	return {fen_param:params.fen_param};
  },

  serialize: function(model) {
    // this will make the URL `/posts/foo-post`

    return { fen_param: model.get('slug') };
  },
		setupController:function(controller){
			var router=this
			var fen_param=this.modelFor('position').fen_param

				$.getJSON("/positions?fen="+this.modelFor('position').fen_param).then(function(response){
					controller.set('model',{fen_param:response.fen_param})	
					router.controllerFor("evaluations").set('model',_.map(response.evaluations,function(object,key){
						var eval=EngineEval.Evaluation.create(object)
						eval.set("index",key+1)
						if(decodeURI(fen_param).split(" ")[1]==="b")
							{eval.set("evaluation",eval.get("evaluation")*-1)}
						return eval
					}))
					router.controllerFor("tags").set('model',response.tags)
				})
			
					
			},
			renderTemplate: function() {
        // Render default outlet   
		        this.render();
		        // render extra outlets
		        this.render("evaluations", {
		            outlet: "evaluations",
		            into: "positions" // important when using at root level
		        });
		        this.render("tags", {
		            outlet: "tags",
		            into: "positions" // important when using at root level
		        });
    		}
    })