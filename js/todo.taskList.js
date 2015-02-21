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

  stateMap, jqueryMap, setJqueryMap, addTodo, on_login, task_view, get_todos ;

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
        var description = $(this).serializeArray(),
        id = localStorage.id,
        api_token = localStorage.api_token;
        $.ajax({
         url: todo.routes.add_todo(id),
         type: "POST",
         data: {api_token: api_token, todo:{description: description[0].value}}
        })
         .done(function(result){
           $(jqueryMap.$task_list).append(task_view(result));
         })
         .fail(function(xhr,status, error){
           console.log(error)
       })
      })
  };

   on_login = function(){
      jqueryMap.$container.find("#todo-list").prepend(configMap.add_task_form) 
      addTodo();
      get_todos();
   };

  task_view = function(todo_data){
      var view = '<div class="todo-item" id="'
                 + todo_data.id
                 +'">'
                 +'<p>'+ todo_data.description + '</p>'
                 + '<div class="is_complete"></div>'
                 + '</div>';
      return view
  }

  get_todos = function(){
   var id = localStorage.id,
       api_token = localStorage.api_token;
   $.ajax({
     url: todo.routes.get_todos(id),
     type: "GET",
     data: {api_token: api_token} 
   })
    .done(function(result){
      console.log(result); 
    })
  
  }
  initModule = function($container){
     stateMap.$container = $container;
     setJqueryMap();
  }

  return {
    initModule: initModule,
    on_login: on_login
  } 
}());
