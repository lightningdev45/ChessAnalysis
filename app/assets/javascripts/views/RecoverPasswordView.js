EngineEval.RecoverPasswordView = Ember.View.extend({
	didInsertElement: function() {
		var height=$(".centered-user-interface").height();
		windowHeight=$(window).height();
		$(".centered-user-interface").css("top",(windowHeight-height)/2-70);
	},
	    willAnimateIn : function () {
        this.$().css("opacity", 0);
    },

    animateIn : function (done) {
        this.$().fadeTo(250, 1, done);
    },

    animateOut : function (done) {
        this.$().fadeTo(250, 0, done);
    }
})
