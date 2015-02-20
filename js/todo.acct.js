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
      },
     logout_link: '<li><a href="#" id="logout-link">Logout</a></li>' 
  },
   jqueryMap, setJqueryMap, stateMap, auth_user, delete_auth, initModule ;
   
  stateMap = { $container: null }
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { 
      $container: $container,
      $nav: $container.find('nav'),
      $form: $container.find('#todo-form')
    }
   }    
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
        localStorage.setItem("api_token", result.api_token);
        localStorage.setItem("id", result.id);
        todo.user.loginUser(result);
        on_login();
      })
      .fail(function(xhr,status, error){
        console.log(error);
      })
  };
   
  delete_auth = function(){
    $.ajax({
     url: todo.routes.logout(),
     type: "DELETE",
     data: { api_token: localStorage.api_token, user_id: localStorage.id } 
    })
     .done(function(result){
       localStorage.clear();
       $("#todo-form").html(configMap.form_html("login"));
       jqueryMap.$nav.find('.right').empty();
        
     }) 
      .fail(function(xhr,status, error){
        console.log(error);
      })
  }
  
  on_login = function(){
    jqueryMap.$form.empty();
    jqueryMap.$nav.find('.right').append(configMap.logout_link);
    $(jqueryMap.$nav.find('#logout-link')).click(function(){
      delete_auth();
      todo = {};
    });
  }
  
  submit_form = function(route){
      jqueryMap.$form.find('form').on("submit", function(event){
        event.preventDefault();
        auth_user($(this).serializeArray(), route);
      }) 
  }
  initModule = function( $container ){
    stateMap.$container = $container;
    setJqueryMap();

    if(localStorage.api_token === undefined ){
      $("#todo-form").html(configMap.form_html("login"));
      submit_form(todo.routes.login());
      $("#signup-link").click(function(){
        $("#todo-form").html(configMap.form_html("register"));
        submit_form(todo.routes.register());
      })   
    }else{
     on_login();   
    }  
    
  }

    
  
  return { initModule: initModule,
 
        delete_auth: delete_auth }

}());

