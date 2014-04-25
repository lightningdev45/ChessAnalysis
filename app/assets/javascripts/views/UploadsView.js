EngineEval.UploadsView = Ember.View.extend({
	didInsertElement:function(){
		var controller=this.get("controller")
			$("#new_upload_form").fileupload({
				dataType:"json",
				done:function(e,data){
					controller.pushObject(data.result.new_upload)
					data.context.find(".progress-bar").html(data.result.new_upload.file+" has finished uploading!")
					$(".progress .close").click(function(){
						$(this).parent().remove()
					})
				
				},
				add:function(e,data){
            		data.context = $('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div><button type="button" class="close" aria-hidden="true">&times;</button></div>')
            		data.context.find(".progress-bar").html("0%")
            		$("#progress-container").append(data.context)
            		data.submit();
				},
				progress:function(e,data){
				    progress = parseInt(data.loaded / data.total * 100, 10)
				    data.context.find(".progress-bar").css('width', progress + '%')
				    data.context.find(".progress-bar").html(progress + '%')
				}
		})
	}
})