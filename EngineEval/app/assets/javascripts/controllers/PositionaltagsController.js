EngineEval.PositionaltagsController=Ember.ArrayController.extend({
	signed_in:chessAnalysis.signed_in,
	actions:{
		tagTactic:function(){
			alert(this.get("signed_in"))
			var controller=this
			$.post("/tag_position?fen="+chessAnalysis.chess[index].fen()+"&tag_type=tactics&tag_value="+$(".tactics-tag-select").val()).then(function(response){
				console.log(controller.get("model"))
				controller.pushObject(response.positions)
			})
		}
	}
})