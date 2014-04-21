EngineEval.AnnotationSelect=Ember.Select.extend({
	click:function(){
		var view=this;
		this.get("controller").get("store").find("annotation",view.identifier).then(function(annotation){			
			$.ajax({
				url:"vote_quality_score",
				type:"POST",
				data:{id:view.identifier,vote:view.get("value")},
				success:function(data){
					annotation.set("quality_score",data.quality_score)
					annotation.set("votes_count",data.votes_count)
					annotation.set("isEditing",false)

				},
				error:function(error){
					view.get("controller.controllers.alert").send("showAlert",JSON.parse(error.responseText).error,"alert alert-warning alert-dismissable","devise-alert")
					view.get("controller").transitionToRoute("login")
				}
			})
			
		})
	}


})
