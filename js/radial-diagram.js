;(function($){

	var defaults = {
		name: 'noname',
		age: 12
	}
	$.fn.diagram = function(options){


		var init = function(){

			console.log($.extend({}, defaults, options));

		}

		init();
	}
})(jQuery);


