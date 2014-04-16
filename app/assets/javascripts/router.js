// For more information see: http://emberjs.com/guides/routing/
EngineEval.Router.map(function() {

  this.route("home",{path:""})
  this.resource('position',{path:'position/:fen_param'})
  this.route("login")
  this.route("registration")
  this.route("howto")
  this.route("support")
  this.route("register")
  this.route("edit")
  this.resource("profile",{path:"profile/:profile_id/:events_id"})
  this.route("user_search",{path:"user_search/:page"})



});

EngineEval.Router.reopen({
  //location: 'history'
});


  


