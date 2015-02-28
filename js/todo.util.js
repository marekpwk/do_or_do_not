todo.util = (function() {

	alertBox = function(alert_message, alert_class) {
		var box = '<div class=" small-12 columns small-centered alert-box '
               + alert_class 
               + ' radius"><p class="text-center">' + alert_message 
              + '</p></div>'
		return box
	};

	return {
		alertBox: alertBox
	}
}());
