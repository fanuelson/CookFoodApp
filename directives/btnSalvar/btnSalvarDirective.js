var btnSalvarDirective = function() {
	return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	      'save': '&saveAction',
			'isBtnDisabled' : '='
	    },
	    replace: true,
	    templateUrl: 'directives/btnSalvar/btnSalvarTemplate.html'
	  };
}

angular.module('myApp').directive('btnSalvar', btnSalvarDirective);
