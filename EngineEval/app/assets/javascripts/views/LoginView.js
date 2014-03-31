EngineEval.LoginView = Ember.View.extend({
	didInsertElement: function() {

		var height=$(".centered-user-interface").height();
		windowHeight=$(window).height();
		$(".centered-user-interface").css("top",(windowHeight-height)/2-70);
	}
})

