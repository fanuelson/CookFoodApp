(function(){

	"use strict";

	function authService($http, APP_CONFIG) {
		var self = this;

		self.login = function(user) {
			return $http.post('http://localhost:8080/SpringAngularApp/auth/login', user);
		}

	}

	var depends = [
		'$http',
		'APP_CONFIG',
		authService
	];

	angular.module('myApp').service('authService', depends);

})();
