function usuarioService($http, APP_CONFIG) {

	var restUrlBase = APP_CONFIG.REST_BASE_URL;

	this.findAll = function() {
		return $http.get(restUrlBase+'/usuarios');
	}
}

var depends = [
	'$http',
	'APP_CONFIG',
	usuarioService
];


angular.module('myApp').service('UsuarioService', depends);
