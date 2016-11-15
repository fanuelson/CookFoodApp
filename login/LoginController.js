function loginController($scope, authService, tokenService, APP_CONFIG) {

	$scope.user = {};

	$scope.userLogged.isLoggedIn = false;

	$scope.login = function() {
		$promiseLogin = authService.login($scope.user);

		$promiseLogin.success(function(res){
			console.log('LOGIN SUCESSO');
			$scope.updateIsLoggedIn();
			$scope.mensagemErro = null;
		}).error(function(res){
			console.log('LOGIN ERRO');
			$scope.mensagemErro = res.message;
			$scope.updateIsLoggedIn();
		});
	}

	$scope.updateIsLoggedIn = function() {
		$scope.userLogged.isLoggedIn = tokenService.getToken() ? true : false;
	}

	$scope.updateIsLoggedIn();
}

var depends = [
    '$scope',
    'authService',
    'tokenService',
    'APP_CONFIG',
	loginController ]

angular.module('myApp').controller('loginController', depends);
