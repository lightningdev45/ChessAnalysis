EngineEval.GameInputController=Ember.ObjectController.extend({
	rawPgn:"",
	needs:["alert"],
	editMode:true,
	gameMoves:[],
	gameFen:[],
	actions:{
		covertRawPgn:function(){
			var inputGame=new Chess();
			if(inputGame.load_pgn(this.rawPgn)){
				var game_history=inputGame.history()
				this.set("gameMoves",game_history)
				this.set("editMode",false)
				inputGame.reset();
				var game_fens=[]
				game_fens.push(inputGame.fen())
				_.each(game_history,function(move,index){
					inputGame.move(move)
					game_fens.push(inputGame.fen())
			
				})
				this.set("gameFen",game_fens)
				}
			else{
				this.get("controllers.alert").send("showAlert","There was an error parsing the pgn you input.  Please check for errors.","alert alert-danger alert-dismissable","devise-alert")
			}
    		},
    	backToEdit:function(){
    		this.set("editMode",true)
    	}
	}
	
})