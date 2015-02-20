todo.shell = (function(){

  var configMap = {
      
     main_html : String()
        + '<nav class="top-bar" data-topbar role="navigation">'
          + '<div class="row">     '
          + '<div class="small-12 small-centered columns medium-8  large-8 large-centered">'
      + '<ul class="title-area">'
        + '<li class="name">'
          + '<h1><a href="#">DO OR DO NOT</a></h1>'
        + '</li>'
         + '<!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->'
        + '<li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>'
      + '</ul>'
      + '<section class="top-bar-section">'
        + '<!-- Right Nav Section -->'
        + '<ul class="right">'
        + '</ul>'
      + '</section>'
    + '</div>'
    + '</div>'
      + '</nav>'
      + '<div class="row">'
        + '<div class="small-12 columns todo-main-content">'
          + '<div id="todo-form"></div>'
          + '<div id="todo-list">'
            + '<div id="todo-add-item"></div>'
            + '<div class="todo-item large-11 columns large-centered">'
            + '</div>   '
          + '</div>'
          + '<div class="spa-shell-single-item"></div>'
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

