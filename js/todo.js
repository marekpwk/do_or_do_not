var todo = (function(){
  var initModule = function( $container ){
      todo.shell.initModule( $container ); 
      todo.user.initModule();
      todo.taskList.initModule($container);
      todo.acct.initModule($container);
      todo.routes;
  };
   return {initModule: initModule };
}());

