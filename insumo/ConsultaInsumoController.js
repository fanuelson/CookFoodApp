function consultaInsumoController($scope, $mdToast, APP_CONFIG, insumoService, medidaService) {

	$scope.headerMessage = "Consulta Insumos";

	$scope.pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE;

	$scope.insumosPage = {};

	$scope.filtroPesquisa = {};

	$scope.insumoExclusao = {};

	$scope.findAllInsumosPage = function(page) {
		if(page == $scope.insumosPage.totalPages) {
			return;
		}
		$scope.tabelaInsumosLoading = true;
		$promisePage = insumoService.findAllPage(page, $scope.pageSize);
		$promisePage.success(function(data) {
			$scope.insumosPage = data;
			$scope.tabelaInsumosLoading = false;
		}).error(function(data){
			$scope.tabelaInsumosLoading = false;
		});

	}

	$scope.findAllInsumosPageFilterBy = function(page) {
		if(page == $scope.insumosPage.totalPages) {
			return;
		}
		$scope.tabelaInsumosLoading = true;
		$promisePage = insumoService.findAllPageFilterBy($scope.filtroPesquisa, page, $scope.pageSize);
		$promisePage.success(function(data) {
			$scope.insumosPage = data;
			$scope.tabelaInsumosLoading = false;
		}).error(function(data){
			$scope.tabelaInsumosLoading = false;
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

	$scope.pesquisar = function() {
		$scope.findAllInsumosPageFilterBy();
	}

	$scope.limparFiltroPesquisa = function() {
		$scope.filtroPesquisa = {};
	}

	$scope.setInsumoExclusao = function(insumo) {
		$scope.insumoExclusao = insumo;
	}

	$scope.del = function() {
		$scope.formInsumoLoading = true;
		$promiseDelete = insumoService.del($scope.insumoExclusao.id);
		$promiseDelete
			.success(function(data) {
				$scope.findAllInsumosPageFilterBy($scope.page);
				$scope.showSimpleToast(data.mensagem);
			})
			.error(function(data){
				$scope.messageError = data.message;
			});
	}

	$scope.showSimpleToast = function(message) {
		$mdToast.show(
			$mdToast.simple()
			.textContent(message)
			.position('bottom right')
			.hideDelay(3000)
		);
	};

	$scope.getPages = function(num) {
		return new Array(num);
	}

	var setPageSize = function(pageSize) {
		$scope.pageSize = pageSize;
	}

	$scope.findAllMedidas();

	$scope.findAllInsumosPage(0);

}

var depends = [
    '$scope',
	 '$mdToast',
    'APP_CONFIG',
    'insumoService',
    'medidaService',
    consultaInsumoController ]

angular.module('myApp').controller('consultaInsumoController', depends);
