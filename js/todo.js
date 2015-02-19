var todo = (function(){
  var initModule = function( $container ){
      todo.shell.initModule( $container ); 
      todo.user.initModule();
      todo.acct.initModule();
  };
   return {initModule: initModule };
}());

