EngineEval.ProfileEventsRoute = Ember.Route.extend({
	model:function(params){
		console.log("c")
		if(params.event_id==="1")
			{response=this.modelFor("profile")
			_.each(response.events,function(item,index){
				response.events[index].urifen=encodeURIComponent(item.fen)
	      		})
			console.log(response)
	      		return response
			}
			else{
				return $.getJSON("/user/"+this.modelFor("profile").user.id+"?events_id="+params.event_id).then(function(data){
	      		response=data
	      		_.each(data.events,function(item,index){
	      			response.events[index].urifen=encodeURIComponent(item.fen)
	      		})
	      		console.log(response)
	      		return response
	      })
			}
	}
})