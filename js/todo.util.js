todo.util = (function(){

 alertBox = function(alert_message){
    var box = '<div class=" small-9 columns small-centered alert-box alert radius">'
      + alert_message
    +'</div>'
    return box
 };

 return {
   alertBox: alertBox  
 }
}());
