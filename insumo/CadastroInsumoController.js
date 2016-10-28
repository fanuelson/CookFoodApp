function cadastroInsumoController($scope, APP_CONFIG, insumoService, medidaService) {

	$scope.headerMessage = "Cadastro de Insumo";

	$scope.formInsumoLoading = true;

	$scope.insumo = {

	};

	$scope.insumoIsInvalid = function() {
		return S($scope.insumo.nome).isEmpty()
			|| $scope.insumo.quantidade == null
			|| $scope.insumo.quantidade == 0
			|| S($scope.insumo.medida).isEmpty();

	}

	$scope.save = function() {
		$scope.formInsumoLoading = true;
		console.log($scope.insumo.medida);
		$promiseSave = insumoService.save($scope.insumo);

		$promiseSave.success(function(data) {
			$scope.formInsumoLoading = false;
			$scope.error = null;
			$scope.insumo = {};
			$scope.retornoSucesso = data;
		}).error(function(data) {
			$scope.formInsumoLoading = false;
			$scope.error = data;
		});
	}

	$scope.findAllMedidas = function() {
		$promiseFindAllMedida = medidaService.findAll();

		$promiseFindAllMedida.success(function(data) {
			$scope.medidas = data;
			$scope.formInsumoLoading = false;
		}).error(function(data) {
			$scope.formInsumoLoading = false;

		});
	}

	$scope.limparCampos = function() {
		$scope.insumo = {};
		$scope.error = {};
		$scope.findAllMedidas();
		$scope.formInsumoLoading = false;
		$scope.retornoSucesso = {};
	}

	$scope.findAllMedidas();
}

var depends = [
    '$scope',
    'APP_CONFIG',
    'insumoService',
    'medidaService',
	cadastroInsumoController ]

angular.module('myApp').controller('cadastroInsumoController', depends);
