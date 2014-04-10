EngineEval.UserSearchController = Ember.ObjectController.extend({
	needs:["auth"],
	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
  currentUser: Em.computed.alias("controllers.auth.currentUser")
})