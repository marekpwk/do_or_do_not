todo.acct = (function(){
  
  var configMap = {
    form_html: function(form_type){
      var link,
      new_form =  
     '<div class="row">'
      +'<div class="large-6 large-centered columns">'
      + '<form class="'
         + form_type
         +'">'
         + '<input type="text" value=""  name="email" id="email"/>'
         + '<input type="text" value=""  name="password" id="password"/>' 
         + '<input type="submit" value="'
         + form_type
         + '" id="'
         + form_type 
         + '" class="button small">'
       + '</form>';

     if(form_type === "login"){
       link = '<a href="#" id="signup-link">Register</a>';
     }else{ 
       link = '<a href="#" id="sigin-link">SignIn</a>';
     }
     new_form += link + '</div></div>'
      return new_form 
    }
  },
   jqueryMap, auth_user, delete_auth, initModule ;

  jqueryMap = { $form_container: $("#todo-form") }

  auth_user = function(form_data, route){
    var email = form_data[0].value;
    var password = form_data[1].value; 
    var route = route;
    $.ajax({
      url: route,
      type: "POST",
      data: {email: email, password: password}
    })
      .done(function(result){
        console.log(configMap);
        localStorage.setItem("api_token", result.api_token);
        localStorage.setItem("id", result.id);
        console.log (todo.user.stateMap.user);
      })
      .fail(function(xhr,status, error){
        console.log(error);
        alert(error); 
      })
  };
   
  delete_auth = function(){
    console.log(configMap);
    $.ajax({
     url: todo.routes.logout(),
     type: "DELETE",
     data: { api_token: localStorage.api_token, user_id: localStorage.id } 
    })
     .done(function(result){
       localStorage.clear();
       $("#todo-form").html(configMap.form_html("login"));
        
     }) 
  }

  initModule = function(){
    if(localStorage.api_token === undefined ){
      $("#todo-form").html(configMap.form_html("login"));
    }  
    $("form").on("submit", function(event){
      event.preventDefault();
      auth_user($(this).serializeArray(), todo.routes.register());
    })    
  }

    
  
  return { initModule: initModule,
 
        delete_auth: delete_auth }

}());

