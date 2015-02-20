todo.task = (function(){
  'use strict'
 
 var todoProto, 
  var makeTodo = function(todo_data){
     var todo;
     todo = Object.create(todoProto);
     todo.id = tod_data.id;
     todo.description = todo_data.description;
     todo.is_complete = todo_data.is_complete;
     return todo;
    };
   
   return { makeTodo: makeTodo  }
}());

