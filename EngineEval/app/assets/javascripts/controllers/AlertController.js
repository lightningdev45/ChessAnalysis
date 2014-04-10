EngineEval.AlertController = Ember.ObjectController.extend({
	message:"",
	class:"alert alert-success alert-dismissable",
	actions:{
		showAlert:function(alertmessage,alertclass,alertid){
		this.set("class",alertclass)
		this.set("message",alertmessage)
		$("#"+alertid).show()
		setTimeout(function(){$("#"+alertid).hide()},5000)
		}
	}
})