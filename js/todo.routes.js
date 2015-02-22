todo.routes=(function(){
  
  var configMap = {
    host: "http://0.0.0.0:3000",
    login: function(){
      return [configMap.host, "users/sign_in"].join("/") 
    },
    register: function(){
      return [configMap.host, "users"].join("/")   
    },
    logout: function(){
      return [configMap.host, "users/sign_out"].join("/") 
    },
    get_todos: function(user_id){
     return [configMap.host, 'users', user_id, 'todos'].join("/") 
    },
    add_todo: function(user_id){
     return [configMap.host, 'users', user_id, 'todos'].join("/") 
    },
    update_todo: function(user_id, todo_id){
     return [configMap.host, 'users', user_id, 'todos', todo_id].join("/") 
    }
  }

 return { 
   login: configMap.login,
   register: configMap.register,
   logout: configMap.logout,
   get_todos: configMap.get_todos,
   add_todo: configMap.add_todo,
   update_todo: configMap.update_todo
 }
}());
