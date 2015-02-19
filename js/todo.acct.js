todo.acct = (function(){
  
  var configMap = {
    form_html: function(form_type){
      var new_form =  
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
       + '</form>'
      + '</div>'
     + '</div>'
       if(form_type === "login"){
        new_form + '<a href="#" id="signup-form">Signup</a>'}
        return new_form 
      }
  },
   configModule, initModule ;
  
  initModule = function(){
    $("#todo-form").html(configMap.form_html("login"));
  
  }

    
  
  return {initModule: initModule }

}());

