(function(){

	function tokenInterceptor(APP_CONFIG, $injector, $q, tokenService) {
		return {

			// automatically attach Authorization header
			request : function(config) {
				var token = tokenService.getToken();
				if(token) {
					config.headers.Authorization = 'Bearer ' + token;
				}

				return config;
			},

			requestError : function(config) {
				console.log(config);
				return config;
			},

			// If a token was sent back, save it
			response : function(res) {
				var token = res.data.token;
				if(token) {
					tokenService.saveToken(token);
				} else if (res.headers('refresh-token')) {
					tokenService.saveToken(res.headers('refresh-token'));
				}
				return res;
			},

			responseError : function(res) {
				if(res.data && res.data.message == 'Invalid token') {
					console.log(res.data.message);
					tokenService.removeToken();
					$injector.get('$state').transitionTo('login');
				}
				return $q.reject(res);
			}

		}
	}


	var depends = [
		'APP_CONFIG',
		'$injector',
		'$q',
		'tokenService',
		tokenInterceptor
	];

	angular.module('myApp').factory('tokenInterceptor', depends);

	angular.module('myApp').config(function($httpProvider) {
		$httpProvider.interceptors.push('tokenInterceptor');
	});

})();
