// For more information see: http://emberjs.com/guides/routing/
EngineEval.Router.map(function() {
  this.resource('positions',{path:''},function(){
  	this.resource('position',{path:':fen_param'})
  })
  

});
