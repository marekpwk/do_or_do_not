todo.taskList = (function(){

  var configMap = {
    add_task_form: String()
     +'<div class="row">'
      +'<div class="large-6 large-centered columns">'
      + '<form class="add-task-form">'
         + '<input type="text" value=""  name="description" id="description"/>'
         + '<input type="submit" value="Add Task"  class="button small">'
       + '</form>'
      +'</div>'
    +'</div>'
  },

  stateMap, jqueryMap, setJqueryMap, addTodo, on_login;

  stateMap = { $container: null }

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $task_list: $container.find('#todo-list')
    }
   }
  addTodo = function(){

      jqueryMap.$container.find('form').on("submit", function(event){
        event.preventDefault();
        var description = $(this).serializeArray();
        console.log(description[0]);
        var id = localStorage.id;
        var api_token = localStorage.api_token;
        $.ajax({
         url: todo.routes.add_todo(id),
         type: "POST",
         data: {api_token: api_token, todo:{description: description[0].value}}
        })
         .done(function(result){
            console.log(result)
         })
         .fail(function(xhr,status, error){
           console.log(error)
       })
      })
  };

   on_login = function(){
      jqueryMap.$container.find("#todo-list").prepend(configMap.add_task_form) 
      addTodo();
   };


  initModule = function($container){
     stateMap.$container = $container;
     setJqueryMap();
  }

  return {
    initModule: initModule,
    on_login: on_login
  } 
}());

