EngineEval.ProfileController = Ember.ObjectController.extend({
	needs:["auth"],
	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
  	currentUser: Em.computed.alias("controllers.auth.currentUser"),
	actions:{
		user_search:function(){
			this.transitionToRoute("user_search",1)
		},
		change_relationship:function(){
			alert("change")
		},
		list_followers:function(){
			$.ajax({
				url:"/list_followers?id="+this.get("user").id
			})
			
		},
		list_followed:function(){
			$.ajax({
				url:"/list_followed?id="+this.get("user").id
			})
			
		},
		viewFen:function(fen,urifen){
			setupChess(fen);
			this.transitionToRoute("position",urifen)
		}
	}
})