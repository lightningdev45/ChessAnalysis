EngineEval.OpeningtagsController=Ember.ArrayController.extend({
needs:["auth","alert"],
	isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
	actions:{
		tagOpening:function(){
			var controller=this
			$.post("/tag_position?fen="+chessAnalysis.chess[index].fen()+"&tag_type=opening&tag_value="+$(".opening-tag-select").val()).then(function(response){
				if(response[0]==="a"){
				}
				else{controller.set("model",JSON.parse(response))}
			})
		},
		untagOpening:function(){
			var controller=this
			
			$.post("/untag_position?fen="+chessAnalysis.chess[index].fen()+"&tag_type=opening&tag_value="+$(".opening-tag-select").val()).then(function(response){
				
				if(response[0]==="a"){
				}
				else
					{
						controller.set("model",JSON.parse(response))}
			})
		},
		alertSignIn:function(){
			this.get("controllers.alert").send("showAlert","Your must log-in to perform this action!","alert alert-warning alert-dismissable","devise-alert")

		}
	}
})