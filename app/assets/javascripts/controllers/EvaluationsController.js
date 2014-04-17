EngineEval.EvaluationsController=Ember.ArrayController.extend({
	needs:["position","auth"],
	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
	actions:{
		upvote_evaluation:function(id){
			console.log(this.get("visibleList").length)
			var controller=this;
			$.ajax({
				url:"/upvote_evaluation?id="+id,
				method:"POST",
				success:function(response){
					controller.store.find("evaluation",id).then(function(evaluation){
						evaluation.set("legit",response.legitimacy)					
					})
			}
			})
		},
		downvote_evaluation:function(id){
			var controller=this;
			$.ajax({
				url:"/downvote_evaluation?id="+id,
				method:"POST",
				success:function(response){
					if(response.legitimacy<=-5){
						controller.store.find("evaluation",id).then(function(evaluation){
							controller.removeObject(evaluation)
							_.each(controller.get("model"),function(evaluation,index){
                                evaluation.set("index",index+1)
                            })
                            $("#evaluations_table").css("opacity",0)
							$("#evaluations_table").fadeTo(500,1)
						})
						
					}
					else{
						controller.store.find("evaluation",id).then(function(evaluation){
							evaluation.set("legit",response.legitimacy)					
						})
					}
			}
			})
		},
		changePage:function(index){
			this.set("currentPage",index)
			$("#evaluations_table").css("opacity",0)
			$("#evaluations_table").fadeTo(500,1)
		}
	},
	currentPage:1,
	visibleList:function(){
		return _.first(_.rest(this.get("model"),(this.get("currentPage")-1)*6),6)
	}.property("model","model.[]","currentPage"),
	pagination:function(){
		var controller=this;
		var length=this.get("model").length
		if(length%6===0){
			var ceiling=Math.floor(length/6)
		}
		else{
			var ceiling=(Math.floor(length/6)+1)
		}
		var pagination=_.map(_.range(1,ceiling+1),function(page){
			if(page===controller.get("currentPage")){
				return [page,true]}
				else{
					return [page,false]
				}
		})
		return pagination
	}.property("model","model.[]","currentPage")	
})