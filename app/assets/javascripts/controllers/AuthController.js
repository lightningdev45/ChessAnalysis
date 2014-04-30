EngineEval.AuthController = Ember.ObjectController.extend({
  needs:["alert"],
  currentUser:null,
  isAuthenticated: function() {
   var me=this;
    if(this.get("currentUser")){
      return true
    }
    else{
      $.getJSON("/users/current.json").then( function( data ) {  
        if(data){
          me.set("currentUser",data.user)
        }    
      })
    }
  }.property('currentUser'),
  login: function(route){
   var me = this
    $.ajax({
      url: "/users/sign_in.json",
      type: "POST",
      data:{"user[email]": route.controller.get("email"),
        "user[password]": route.controller.get("password")},     
      success:function(data){
        console.log("Login Msg #{data.user.dummy_msg}")
        $('meta[name="csrf-token"]').attr('content', data['csrf-token'])
        $('meta[name="csrf-param"]').attr('content', data['csrf-param'])
        if(data.user)
          {me.set('currentUser', data.user)}
        route.controllerFor("login").setProperties({password:"",password_confirmation:"",profile_name:"",email:""})
        route.controllerFor("alert").send("showAlert","You have successfully logged in.  Welcome to ChessPrime!","alert alert-success alert-dismissable","devise-alert")
        route.transitionTo('position',"rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201")
      },
      error:function (jqXHR, textStatus, errorThrown){
        if(jqXHR.responseJSON.error)
          {route.controllerFor("alert").send("showAlert",jqXHR.responseJSON.error,"alert alert-danger alert-dismissable","devise-alert")}
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
        "user[profile_name]": route.controller.get("profile_name"),
        "user[email]": route.controller.get("email"),
        "user[password]": route.controller.get("password"),
        "user[password_confirmation]": route.controller.get("password_confirmation")
      },       
      success: function(data){
        if(data.user)
         {me.set('currentUser', data.user)}
         $('meta[name="csrf-token"]').attr('content', data['csrf-token'])
        $('meta[name="csrf-param"]').attr('content', data['csrf-param'])
        route.controllerFor("register").setProperties({password:"",password_confirmation:"",profile_name:"",email:""})
         route.controllerFor("alert").send("showAlert","You have successfully registered.  Welcome to ChessPrime!","alert alert-success alert-dismissable","devise-alert")
        route.transitionTo('position',"rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201")},
      error: function(jqXHR, textStatus, errorThrown){
          if(jqXHR.responseJSON.errors){
            if(jqXHR.responseJSON.errors.email){
              route.controllerFor("alert").send("showAlert","That email "+jqXHR.responseJSON.errors.email+".","alert alert-danger alert-dismissable","devise-alert") 
            }
            else if(jqXHR.responseJSON.errors.profile_name){
              route.controllerFor("alert").send("showAlert","That profile name "+jqXHR.responseJSON.errors.profile_name+".","alert alert-danger alert-dismissable","devise-alert")
            }
            else{
              route.controllerFor("alert").send("showAlert","There was an error.  Please register again or contact support.","alert alert-danger alert-dismissable","devise-alert")
            }
          }
          else{
            route.controllerFor("alert").send("showAlert","There was an error.  Please register again or contact support.","alert alert-danger alert-dismissable","devise-alert")
          }
        }     
    })
      
  },
  
  recover_password:function(route){
    console.log(route.controller.email)
    $.ajax({
      url: "/users/password",
      type: "POST",
      data:{
        "user[email]": route.controller.get("email")
      },
      success:function(data){
        route.controllerFor("recover_password").setProperties({email:""})
        route.controllerFor("alert").send("showAlert","You have successfully requested to change your password!  Please check the email associated with the account.","alert alert-success alert-dismissable","devise-alert")
      },
      error:function(data){
        route.controllerFor("alert").send("showAlert","An error occurred.  Please request a new link and/or contact support.","alert alert-danger alert-dismissable","devise-alert")
      }
  })
  },

  change_password:function(route){
    console.log(route.controller.password)
    var me=this;
    $.ajax({
      url: "/users/password",
      type: "PUT",
      data:{
        "user[password]": route.controller.get("password"),
        "user[password_confirmation]": route.controller.get("password_confirmation"),
        "user[reset_password_token]": route.controller.get("token")
      },
      success:function(data){
        if(data.user)
          {me.set('currentUser', data.user)}
        route.controllerFor("change_password").setProperties({password:"",password_confirmation:"",token:""})
        route.controllerFor("alert").send("showAlert","You have successfully changed your password!","alert alert-success alert-dismissable","devise-alert")
        route.transitionTo('position',"rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201")
      },
      error:function(data){
        route.controllerFor("alert").send("showAlert","There was an error.  Please request a new link and/or contact support.","alert alert-danger alert-dismissable","devise-alert")
      }
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
      async:true,
      success:function (data, textStatus, jqXHR){
        $('meta[name="csrf-token"]').attr('content', data['csrf-token'])
        $('meta[name="csrf-param"]').attr('content', data['csrf-param'])
        console.log("Logged out on server")
        me.set('currentUser', null)
        me.get("controllers.alert").send("showAlert","You have successfully logged out!","alert alert-success alert-dismissable","devise-alert")
        me.transitionToRoute("position","rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201")},
      error:function (jqXHR, textStatus, errorThrown){
        route.controllerFor("alert").send("showAlert","There was an error.  Please try logging out again and/or contact support.","alert alert-danger alert-dismissable","devise-alert")}     
            
    })
     
  },
  edit:function(route){
    var me = this
    $.ajax({
      url: "/users.json",
      type: "PUT",
      data:{"user[other]": route.controller.get("other"),"user[location]": route.controller.get("location"),"user[email]": route.controller.get("email"),"user[rating]":route.controller.get("rating"),"user[title]":route.controller.get("title"),"user[id]":route.controller.get("id"),
        "user[current_password]": route.controller.get("current_password"),"user[password]": route.controller.get("password"),"user[password_confirmation]": route.controller.get("password_confirmation"),"user[first_name]":route.controller.get("first_name"),"user[last_name]":route.controller.get("last_name"),"user[first_name_privacy]": route.controller.get("first_name_privacy"),"user[last_name_privacy]": route.controller.get("last_name_privacy"),"user[email_privacy]": route.controller.get("email_privacy"),"user[location_privacy]": route.controller.get("location_privacy"),"user[rating_privacy]": route.controller.get("rating_privacy"),"user[title_privacy]": route.controller.get("title_privacy"),"user[other_privacy]": route.controller.get("other_privacy")},     
      success:function(data){
        console.log("Edit Msg #{data.user.dummy_msg}")
        $('meta[name="csrf-token"]').attr('content', data['csrf-token'])
        $('meta[name="csrf-param"]').attr('content', data['csrf-param'])
        if(data.user)
          {me.set('currentUser', data.user)}
        route.controllerFor("edit").set('current_password',"")
        route.controllerFor("edit").set('password',"")
        route.controllerFor("edit").set('password_confirmation',"")
        route.controllerFor("alert").send("showAlert","You have successfully edited your profile!","alert alert-success alert-dismissable","devise-alert")
        route.transitionTo('edit')
      },
      error:function (jqXHR, textStatus, errorThrown){
        if(jqXHR.responseJSON.errors.current_password){
          route.controllerFor("alert").send("showAlert","The field 'Current Password' "+jqXHR.responseJSON.errors.current_password+".","alert alert-danger alert-dismissable","devise-alert")
        }
        else{
          route.controllerFor("alert").send("showAlert","There was an error.  Please try again and/or contact support.","alert alert-danger alert-dismissable","devise-alert")
        }
         if(jqXHR.status==401)
          {route.controllerFor('edit').set("errorMsg", "That email/password combo didn't work.  Please try again")}
        else if(jqXHR.status==406)
         { route.controllerFor('edit').set("errorMsg", "Request not acceptable (406):  make sure Devise responds to JSON.")}
        else
          {console.log("Edit Error: #{jqXHR.status} | #{errorThrown}")}
      }
       
    })

  }
  

})
  