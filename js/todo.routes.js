todo.routes = (function() {

  var configMap = {
    host: "http://recruiting-api.nextcapital.com",
    login: function() {
      return [configMap.host, "users/sign_in"].join("/")
    },
    register: function() {
      return [configMap.host, "users"].join("/")
    },
    logout: function() {
      return [configMap.host, "users/sign_out"].join("/")
    },
    getTodos: function(user_id) {
      return [configMap.host, 'users', user_id, 'todos'].join("/")
    },
    addTodo: function(user_id) {
      return [configMap.host, 'users', user_id, 'todos'].join("/")
    },
    updateTodo: function(user_id, todo_id) {
      return [configMap.host, 'users', user_id, 'todos', todo_id].join("/")
    }
  }

  return {
    host: configMap.host,
    login: configMap.login,
    register: configMap.register,
    logout: configMap.logout,
    getTodos: configMap.getTodos,
    addTodo: configMap.addTodo,
    updateTodo: configMap.updateTodo
  }
}());
