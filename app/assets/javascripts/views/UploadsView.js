EngineEval.UploadsView = Ember.View.extend({
	didInsertElement:function(){
		var controller=this.get("controller")
			$("#new_upload_form").fileupload({
				dataType:"json",
				done:function(e,data){
					controller.pushObject(data.result.new_upload)
				},
				progress:function(e,data){

				}
		})
	}
})