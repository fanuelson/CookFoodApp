function mainController($scope, $mdSidenav, $state, APP_CONFIG, tokenService) {

	$scope.userLogged = {
			isLoggedIn : false
	};

	$scope.logout = function(){
		tokenService.removeToken();
		$scope.updateIsLoggedIn();
		$state.go('login');
	}

	$scope.isCurrentState = function(_state) {
		return $state.current.name == _state;
	}

	$scope.updateIsLoggedIn = function() {
		$scope.userLogged.isLoggedIn = tokenService.getToken() ? true : false;
	}

	$scope.updateIsLoggedIn();

	$scope.toggleMenu = toggleMenu('sideBarMenu');

	function toggleMenu(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		}
	}
}

var depends = [
    '$scope',
	 '$mdSidenav',
    '$state',
    'APP_CONFIG',
    'tokenService',
    mainController ]

angular.module('myApp').controller('mainController', depends);
