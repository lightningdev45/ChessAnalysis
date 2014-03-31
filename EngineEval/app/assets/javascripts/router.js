// For more information see: http://emberjs.com/guides/routing/
EngineEval.Router.map(function() {

  this.resource('positions',{path:''},function(){
  	this.resource('position',{path:':fen_param'})
  })
  this.route("login")
  this.route("registration")
  this.route("howto")
  this.route("support")
  this.route("register")


});

EngineEval.Router.reopen({
  location: 'history'
});


  


