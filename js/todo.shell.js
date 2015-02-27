todo.shell = (function(){

  var configMap = {
      
     main_html : '<div class="fixed">'
        + '<nav class="top-bar" data-topbar role="navigation">'
          + '<div class="row">     '
          + '<div class="small-12 small-centered columns medium-8  large-7 large-centered">'
      + '<ul class="title-area">'
        + '<li class="name">'
          + '<h1><a href="index.html">DO OR DO NOT</h1>'
        + '</li>'
        + '<li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>'
      + '</ul>'
      + '<section class="top-bar-section">'
        + '<ul class="right">'
          +'<li class="name" id="counter-wrap"></li>'
        + '</ul>'
      + '</section>'
    + '</div>'
    + '</div>'
      + '</nav>'
     +'</div>'
      + '<div class="row">'
        + '<div class="small-10 columns small-centered todo-main-content">'
          + '<div id="todo-welcome-form-alert"></div>'
          + '<div id="todo-welcome-form"></div>'
          + '<div id="todo-add-form"><div id="todo-add-form-alert"></div></div>'
          + '<div id="todo-list" class="row"></div>'
      + '</div>'
   },
    stateMap = { $container : null },
    jqueryMap = {},

    setJqueryMap, initModule;
 
    /* DOM methods */
   
   setJqueryMap = function () {
      var $container = stateMap.$container;
      jqueryMap = { 
        $container: $container,
        $nav: $container.find('nav')
      };     
   
   };
   
   initModule = function ( $container ){
     stateMap.$container = $container;
     $container.html( configMap.main_html );
     setJqueryMap(); 
   };
   
   return { initModule: initModule };
}());

