function usuarioController($scope, usuarioService) {

	$scope.welcomeMessage = "Hello";

	$promise = usuarioService.findAll();

	$promise.success(function(data) {
		$scope.usuarios = data;
	});
}

var depends = [
   '$scope',
   'usuarioService',
   usuarioController
];

angular.module('myApp').controller('usuarioController', depends);
