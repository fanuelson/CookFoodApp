var menuToggleDirective = function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
			$(elem).click(function() {
				$('.ui.sidebar').sidebar({
					context: $('.bottom.segment')
				}).sidebar('toggle');
			});

        }
    }
}

angular.module('myApp').directive("menuToggle", menuToggleDirective);
