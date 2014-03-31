EngineEval.AuthController = Ember.ObjectController.extend({
  currentUser:  null,
  isAuthenticated: Ember.computed.notEmpty("currentUser.email"),
   
  login: function(route){
    
    me = this
    $.ajax({
      url: "/users/sign_in.json",
      type: "POST",
      data:{"user[email]": route.controller.get("email"),
        "user[password]": route.controller.get("password")},     
      success:function(data){
        console.log("Login Msg #{data.user.dummy_msg}")
        me.set('currentUser', data.user)
        route.transitionTo('positions')
      },
      error:function (jqXHR, textStatus, errorThrown){
         if(jqXHR.status==401)
          {route.controllerFor('login').set("errorMsg", "That email/password combo didn't work.  Please try again")}
        else if(jqXHR.status==406)
         { route.controllerFor('login').set("errorMsg", "Request not acceptable (406):  make sure Devise responds to JSON.")}
        else
          {console.log("Login Error: #{jqXHR.status} | #{errorThrown}")}
      }
       
    })
      
  },
  register:function(route){
      me = this

    $.ajax({
      url: "/users.json",
      type: "POST",
      data:{
        "user[profile_name]": route.currentModel.profile_name,
        "user[email]": route.currentModel.email,
        "user[password]": route.currentModel.password,
        "user[password_confirmation]": route.currentModel.password_confirmation
      },       
      success: function(data){
         me.set('currentUser', data.user)
        route.transitionTo('positions')},
      error: function(jqXHR, textStatus, errorThrown){
        route.controllerFor('registration').set("errorMsg", "That email/password combo didn't work.  Please try again")}     
    })
      
  },
  

  logout:function(){
    console.log("Logging out...")
    me = this
    //token = $('meta[name="csrf-token"]').attr('content')
    //$.ajaxPrefilter(function(options, originalOptions, xhr){
      //xhr.setRequestHeader('X-CSRF-Token', token)
    //})
    
    $.ajax({
      url: "/users/sign_out.json",
      type: "DELETE",
      dataType: "json",
      success:function (data, textStatus, jqXHR){
        $('meta[name="csrf-token"]').attr('content', data['csrf-token'])
        $('meta[name="csrf-param"]').attr('content', data['csrf-param'])
        console.log("Logged out on server")
        me.set('currentUser', null)
        me.transitionToRoute("positions")},
      error:function (jqXHR, textStatus, errorThrown){
        alert("Error logging out: #{errorThrown}")
      }      
    })
      
  }
  

})
  