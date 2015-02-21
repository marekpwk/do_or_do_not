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

  stateMap, jqueryMap, setJqueryMap, addTodo, on_login, task_view, get_todos, make_list ;

  stateMap = {
             $container: null, 
             todoList: {} 
  }

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
           $(jqueryMap.$form).find("input[name='description']").val("");
         })
         .fail(function(xhr,status, error){
           console.log(error)
       })
      })
  };

   on_login = function(){
      jqueryMap.$form = jqueryMap.$container.find("#todo-list");
      jqueryMap.$form.prepend(configMap.add_task_form) 
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
      make_list(result);
    })
  
  }

  make_list = function(json_objects){
   $.each(json_objects, function(i, todo){
     stateMap.todoList[todo.id] = todo;
     $(jqueryMap.$task_list).append(task_view(stateMap.todoList[todo.id]));
   }) 
    console.log(stateMap.todoList); 
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

