(function() {

	function gerenciadorPdvController($scope, APP_CONFIG, $stateParams, produtoService, insumoService) {

		$scope.headerMessage = "Gerenciador PDV";

		$scope.pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE;


	}

	var depends = [
		'$scope',
		'APP_CONFIG',
		'$stateParams',
		'produtoService',
		'insumoService',
		gerenciadorPdvController
	]

	angular.module('myApp').controller('gerenciadorPdvController', depends);

})();
