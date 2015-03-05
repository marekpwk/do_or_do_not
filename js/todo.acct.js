todo.acct = (function() {

  var configMap = {
     welcomeSlogan: '<div id="welcome-slogan" class="row">'
        + '<p class="text-center">D<i class="fa fa-check-circle-o first-o"></i> OR D<i class="fa fa-check-circle-o second-o"></i> NOT'
        + '<p class="text-center slogan-second">THERE IS NO TRY</p><p class="text-center slogan-third">ULTIMATE TODO APP<p>'
        +  '</div>',
     formHtml: function(form_type){
      var link,
      new_form =
     '<div class="row">'
      +'<div class="small-7 small-centered columns">'
      + '<form class="'
         + form_type
         +' radius">'
         + '<input type="text" value=""  name="email" id="email" class="radius" placeholder="Email"/>'
         + '<input type="password" value=""  name="password" id="password" class="radius" placeholder="Password"/>'
         + '<input type="submit" value="'
         + form_type
         + '" id="'
         + form_type
         + '" class="button small radius">'
       + '</form>';

     if(form_type === 'signin'){
       link = '<a href="#" id="register-link" class="form-link">Register</a>';
     }else{
       link = '<a href="#" id="signin-link" class="form-link">SignIn</a>';
     }
     new_form += link + '</div></div>'
      return new_form
      },
      logout_link: '<li><a href="#" id="logout-link">Logout</a></li>',
    },
    jqueryMap, setJqueryMap, stateMap, authUser, submitForm, deleteAuth, emptyContainers, onLogin, onLogout,
    clickFormLink, initModule;

  stateMap = {
    $container: null
  };

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $generalAlert: $container.find('#todo-general-alert'),
      $nav: $container.find('nav'),
      $welcomeForm: $container.find('#todo-welcome-form'),
      $addForm: $container.find('#todo-add-form'),
      $todoList: $container.find('#todo-list')
    }
  };

  authUser = function(form_data, route) {
    var email = form_data[0].value;
    var password = form_data[1].value;
    var route = route;
    $.ajax({
        url: route,
        type: 'POST',
        data: {
          email: email,
          password: password
        }
      })
      .done(function(result) {
        localStorage.setItem('api_token', result.api_token);
        localStorage.setItem('id', result.id);
        todo.user.loginUser(result);
        onLogin();
      })
      .fail(function(xhr, status, error) {
        var alert_message = 'Whoops! Incorrect email or password. Try again:)'
        jqueryMap.$welcomeForm.prepend(todo.util.alertBox(alert_message, 'alert'));
      })
  };

  deleteAuth = function() {
    $.ajax({
        url: todo.routes.logout(),
        type: 'DELETE',
        data: {
          api_token: localStorage.api_token,
          user_id: localStorage.id
        }
      })
      .done(function(result) {})
      .fail(function(xhr, status, error) {
        var alert_message = 'Whoops! Something went wrong, try again in a minute.'
        jqueryMap.$generalAlert.append(todo.util.alertBox(alert_message, 'alert'));
      })
      .always(function(result) {
        localStorage.clear();
        emptyContainers();
        jqueryMap.$welcomeForm.html(configMap.formHtml('signin'));
        jqueryMap.$welcomeForm.prepend(configMap.welcomeSlogan);
        submitForm(todo.routes.login());
        clickFormLink();
        todo.user.stateMap.user = {};
        todo.taskList.onLogout();
      })
  }

  onLogin = function() {
    jqueryMap.$welcomeForm.empty();
    jqueryMap.$nav.find('.right').append(configMap.logout_link);
    todo.taskList.onLogin();
    onLogout();
  };

  onLogout = function() {
    $(jqueryMap.$nav.find('#logout-link')).click(function(event) {
      event.preventDefault();
      deleteAuth();
    })
  };

  submitForm = function(route) {
    jqueryMap.$welcomeForm.find('form').on('submit', function(event) {
      event.preventDefault();
      jqueryMap.$welcomeForm.find('.alert-box').remove();
      var form_data = $(this).serializeArray();
      if (form_data[0].value === '' || form_data[1].value === '') {
        var alert_message = 'Email or password can not be empty.'
        jqueryMap.$welcomeForm.prepend(todo.util.alertBox(alert_message, 'alert'));
      } else {
        jqueryMap.$welcomeForm.find('.alert-box').remove();
        authUser(form_data, route);
      }
    })
  };

  clickFormLink = function() {
    $('.form-link').click(function(event) {
      event.preventDefault();
      if (this.id === 'register-link') {
        jqueryMap.$welcomeForm.html(configMap.formHtml('register'));
        submitForm(todo.routes.register());
        clickFormLink();
      } else {
        jqueryMap.$welcomeForm.html(configMap.formHtml('signin'));
        submitForm(todo.routes.login());
        clickFormLink();
      }
      jqueryMap.$welcomeForm.prepend(configMap.welcomeSlogan);
    })
  }

  emptyContainers = function() {
    jqueryMap.$welcomeForm.empty();
    jqueryMap.$addForm.empty();
    jqueryMap.$todoList.empty();
    jqueryMap.$nav.find('#logout-link').parent().remove();
    jqueryMap.$nav.find('.right #counter-wrap').empty();
  };

  initModule = function($container) {
    stateMap.$container = $container;
    setJqueryMap();
    if (localStorage.api_token === undefined || todo.user.stateMap.user.id === undefined ) {
      $('#todo-welcome-form').html(configMap.formHtml('signin'));
      $('#todo-welcome-form').prepend(configMap.welcomeSlogan);
      submitForm(todo.routes.login());
      clickFormLink();
    } else {
      onLogin();
    }

  }

  return {
    initModule: initModule
  }

}());
