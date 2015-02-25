todo.taskList = (function(){

  var configMap = {
    add_task_form:
     '<div class="row">'
      +'<div class="small-8 small-centered columns">'
      + '<form class="add-task-form">'
       +'<div class="row collapse">'
        +'<div class="small-10 columns">'
         + '<input type="text" value=""  name="description" id="description" class=radius"" placeholder="New Task Description"/>'
        +'</div>'
        +'<div class="small-2 columns">'
         + '<input type="submit" value="Add Task"  class="button radius postfix">'
        +'</div>'

      +'</div>'
       + '</form>'
      +'</div>'
    +'</div>'
  },

  stateMap, jqueryMap, setJqueryMap, addTodo, onLogin, createTodoView, getTodos, edit_todo, makeTodoList ;

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
   };

  getTodos = function(){
   var id = localStorage.id,
       api_token = localStorage.api_token;
   $.ajax({
     url: todo.routes.getTodos(id),
     type: "GET",
     data: {api_token: api_token}
   })
    .done(function(result){
      makeTodoList(result);
      editTodoDescription();
      editTodoIsComplete();
    })

  };

  createTodoView = function(todo_data){
      var complete_class, view;
     if(todo_data.is_complete === true){
        complete_class = 'is-complete';
     }else{
        complete_class = 'is-not-complete';
     }
      view  = '<div class="radius todo-item small-12  columns small-centered" id="'
                 + todo_data.id
                 +'">'

                 +'<div class=" row todo-wrapper">'
                   +'<div class=" radius small-2 columns">'
                     +'<div class="complete  '
                     + complete_class
                     + '">'
                     +'<i class="fa fa-check-circle-o"></i>'
                    +'</div>'
                   +'</div>'

                   +'<div class="small-10 columns todo-description">'
                     +'<p>'+  todo_data.description + '</p>'
                   +'</div>'

               +'</div>'
             + '</div>';
      return view
  };

  makeTodoList = function(json_objects){
   $.each(json_objects, function(i, todo){
     stateMap.todoList[todo.id] = todo;
     $(jqueryMap.$task_list).append(createTodoView(stateMap.todoList[todo.id]));
   })
  };

  addTodo = function(){
      jqueryMap.$container.find('form').on("submit", function(event){
        event.preventDefault();
        var description = $(this).serializeArray(),
        id = localStorage.id,
        api_token = localStorage.api_token;
        $.ajax({
         url: todo.routes.addTodo(id),
         type: "POST",
         data: {api_token: api_token, todo:{description: description[0].value}}
        })
         .done(function(result){
           $(jqueryMap.$task_list).prepend(createTodoView(result));
           $(jqueryMap.$form).find("input[name='description']").val("");
           var task = todo.task.makeTodo(result);
           stateMap.todoList[task.id] = task;
           editSingleTodoComplete(task.id);
           $(jqueryMap.$task_list).find(".todo-item .todo-description").off('dblclick');
           editTodoDescription();
         })
         .fail(function(xhr,status, error){
          console.log(error)
       })
      })
  };

  editTodoDescription = function(){
    $(jqueryMap.$task_list).find(".todo-item .todo-description").dblclick(function(){
     var todo_id = $(this).parent().parent().attr("id");
     var todo = stateMap.todoList[todo_id];
     var todo_view = this;
     $(this).html(
       '<form id="todo-update">'
        +'<div class="row collapse">'
        +'<div class="small-8 columns">'
         +'<input type="text" name="description" value="'
         + todo.description
         +' ">'
       +'</div>'
       +'<div class="small-4 columns">'
        +'<ul class="button-group postfix">'
         + '<li><input type="submit" value="Update" id="update" class="button tiny "></li>'
         + '<li><a href="#" id="cancel" class="button tiny">CANCEL</a></li>'
       + '</ul>'
       +'</div>'
       + '</form>');
     $(jqueryMap.$task_list).find(".todo-item .todo-description").off('dblclick');
     $("form#todo-update").on("submit", function(event){
       event.preventDefault();
      var description = { description:  $(this).serializeArray()[0].value };
      updateTodoDescription(todo, description);
     })
     $("form#todo-update #cancel").on("click", function(event){
      event.preventDefault();
      $(todo_view).parent().parent().replaceWith(createTodoView(todo));
      editTodoDescription();
      editSingleTodoComplete(todo.id);
     })
   })
  };

  updateTodoDescription = function(task, update_data ){
    var id = localStorage.id,
        task = task,
        api_token = localStorage.api_token,
        update_desc  = update_data;
    $.ajax({
      url : todo.routes.updateTodo(id, task.id),
      type : "PUT",
      data: {api_token: api_token, todo: update_desc }
    })
      .done(function(result){
        task.description = result.description;
        $(jqueryMap.$task_list).find("[id="+ task.id +" ]").replaceWith(createTodoView(task)) ;
        editTodoDescription();
        editSingleTodoComplete(task.id);
      })
      .fail(function(xhr, status, error){
        console.log(error);
      })
  };

  editTodoIsComplete = function(){
    $(jqueryMap.$task_list).find('.complete').click(function(){
       var todo_id = $(this).parent().parent().parent().attr("id");
       var todo = stateMap.todoList[todo_id];
       updateTodoIsComplete(todo, toggleIsComplete(todo));
    })
  };

  updateTodoIsComplete = function(task, update_data ){
    var id = localStorage.id,
        task = task,
        api_token = localStorage.api_token,
        update_complete  = update_data;
    $.ajax({
      url : todo.routes.updateTodo(id, task.id),
      type : "PUT",
      data: {api_token: api_token, todo: update_complete}
    })
      .done(function(result){
        task.is_complete = result.is_complete;
        var updated_class = "complete";
        if(task.is_complete === true){
          updated_class += " is-complete"
        }else{
          updated_class += " is-not-complete"
        }
      $(jqueryMap.$task_list).find( "[id="+ task.id +" ] .complete").attr('class', updated_class );
      })
      .fail(function(xhr, status, error){
        console.log(error);
      })
  };

  editSingleTodoComplete = function(task_id){
      var task_id = task_id;
      $(jqueryMap.$task_list).find( "[id="+ task_id +" ] .complete").click(function(){
         var task = stateMap.todoList[task_id];
         updateTodoIsComplete(task, toggleIsComplete(task));
    })
  };

  toggleIsComplete = function(todo){
    if(todo.is_complete == true){
      return { is_complete: false }
    }else{
      return { is_complete: true }
    }
  };

   onLogin = function(){
      jqueryMap.$form = jqueryMap.$container.find("#todo-add-form");
      jqueryMap.$form.prepend(configMap.add_task_form)
      addTodo();
      getTodos();
   };

  initModule = function($container){
     stateMap.$container = $container;
     setJqueryMap();
  };

  return {
    initModule: initModule,
    onLogin: onLogin
  }

}());

