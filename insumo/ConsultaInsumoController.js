function consultaInsumoController($scope, $mdToast, APP_CONFIG, insumoService, medidaService, FileSaver, Blob) {

	$scope.headerMessage = "Consulta Insumos";

	$scope.pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE;

	$scope.insumosPage = {};

	$scope.filtroPesquisa = {};

	$scope.insumoExclusao = {};

	$scope.pdfLoading = false;

	var startPdfLoading = function() {
		$scope.pdfLoading = true;
	}

	var stopPdfLoading = function() {
		$scope.pdfLoading = false;
	}

	var startTabelaLoading = function() {
		$scope.tabelaInsumosLoading = true;
	}

	var stopTabelaLoading = function() {
		$scope.tabelaInsumosLoading = false;
	}

	$scope.findAllInsumosPage = function(page) {
		if(page == $scope.insumosPage.totalPages) {
			return;
		}
		startTabelaLoading();
		$promisePage = insumoService.findAllPage(page, $scope.pageSize);
		$promisePage.success(function(data) {
			$scope.insumosPage = data;
			stopTabelaLoading();
		}).error(function(data){
			stopTabelaLoading();
		});

	}

	$scope.findAllInsumosPageFilterBy = function(page) {
		if(page == $scope.insumosPage.totalPages) {
			return;
		}
		$scope.tabelaInsumosLoading = true;
		startTabelaLoading();
		$promisePage = insumoService.findAllPageFilterBy($scope.filtroPesquisa, page, $scope.pageSize);
		$promisePage.success(function(data) {
			$scope.insumosPage = data;
			stopTabelaLoading();
		}).error(function(data){
			stopTabelaLoading();
		});

	}

	$scope.findAllMedidas = function() {
		$promiseFindAllMedida = medidaService.findAll();

		$promiseFindAllMedida.success(function(data) {
			$scope.medidas = data;
			stopTabelaLoading();
		}).error(function(data) {
			stopTabelaLoading();
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
		startTabelaLoading();
		$promiseDelete = insumoService.del($scope.insumoExclusao.id);
		$promiseDelete
			.success(function(data) {
				$scope.findAllInsumosPageFilterBy($scope.page);
				$scope.showSimpleToast(data.mensagem);
			})
			.error(function(data){
				var mensagem = "";
				angular.forEach(data.validacoesRegraNegocio, function(value){
					mensagem += value + "\n";
				});
				$scope.showSimpleToast(mensagem);
				stopTabelaLoading();
			});
	}

	$scope.showSimpleToast = function(message) {
		$mdToast.show(
			$mdToast.simple()
			.textContent(message)
			.position('bottom right')
			.hideDelay(5000)
		);
	};

	$scope.getPages = function(num) {
		return new Array(num);
	}

	var setPageSize = function(pageSize) {
		$scope.pageSize = pageSize;
	}

	$scope.downloadFile = function() {
		startPdfLoading();
		$promiseDownload = insumoService.downloadReport();
		$promiseDownload.success(function(res){
			var data = new Blob([res], { type: 'application/pdf;charset=utf-8' });
			FileSaver.saveAs(data, 'relatorio_de_insumos.pdf');
			stopPdfLoading();
		}).error(function(res){
			$scope.showSimpleToast("Erro ao fazer download do arquivo");
			stopPdfLoading();
		});
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
	 'FileSaver',
	 'Blob',
    consultaInsumoController ]

angular.module('myApp').controller('consultaInsumoController', depends);
