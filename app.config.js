(function() {

	"use strict";

	/* ROUTE AUTH LISTENER */
		angular.module('myApp').run(function ($rootScope, $state, $location, tokenService) {

		    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		    	if(toState.name != 'login') {
		    		if(!tokenService.hasToken()) {
		    			$state.go('login');
		    	        event.preventDefault();
		    	        return;
		    		}
		    	}


		    });
		});

	/* END ROUTE AUTH LISTENER */

	angular.module('myApp').directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});

})();
