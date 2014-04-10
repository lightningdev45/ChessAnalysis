EngineEval.ProfileController = Ember.ObjectController.extend({
	needs:["auth"],
	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
  	currentUser: Em.computed.alias("controllers.auth.currentUser"),
	actions:{
		user_search:function(){
			this.transitionToRoute("user_search")
		},
		change_relationship:function(){
			alert("change")
		},
		list_followers:function(){
			
		},
		list_followed:function(){
			
		}
	}
})