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
			
				$.getJSON("/positions?fen="+this.modelFor('position').fen_param).then(function(response){
					controller.set('model',{fen_param:response.fen_param})	
					router.controllerFor("evaluations").set('model',response.evaluations)
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