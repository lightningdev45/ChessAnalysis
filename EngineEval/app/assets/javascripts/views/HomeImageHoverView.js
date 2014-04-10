EngineEval.HomeImageHoverView = Ember.View.extend({
	mouseEnter:function(){
		this.$().parents("a").siblings("h3").css("visibility","visible")
			this.$().fadeTo("fast",1)	
	},
	mouseLeave:function(){
			this.$().parents("a").siblings("h3").css("visibility","hidden")
			this.$().fadeTo("fast",0.5)
		}
})