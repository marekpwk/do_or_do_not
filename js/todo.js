var todo = (function(){
  var initModule = function( $container ){
      todo.shell.initModule( $container ); 
      todo.user.initModule();
  };
   return {initModule: initModule };
}());

