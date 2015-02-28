todo.user = (function() {
  'use strict'

  var
    configMap = {
      anon_id: 'a0'
    },
    stateMap = {
      anon_user: null,
      user: null
    },
    userProto, makeUser, initModule, loginUser, currentUser;

  userProto = {};

  makeUser = function(user_data) {
    var user = Object.create(userProto);
    user.id = user_data.id;
    user.email = user_data.email;
    user.api_token = user_data.api_token;
    user.todos = user_data.todos;
    return user;
  };

  loginUser = function(user_data) {
    stateMap.user = makeUser({
      id: user_data.id,
      email: user_data.email,
      api_token: user_data.api_token,
      todos: user_data.todos,
    })
  };
  initModule = function() {
    stateMap.anon_user = makeUser({
      id: configMap.anon_id,
      email: 'no email',
      api_token: 'no token',
      todos: []
    });
    stateMap.user = stateMap.anon_user;
  };

  return {
    initModule: initModule,
    loginUser: loginUser,
    stateMap: stateMap
  }
}());
