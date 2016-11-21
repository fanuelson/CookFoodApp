function consultaProdutosController($scope, $mdToast, APP_CONFIG ,produtoService) {

	$scope.cycle = '' ;
	$scope.headerMessage = "Produtos";

	$scope.pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE;

	$scope.tabelaProdutoLoading = true;

	$scope.filtro = {
		status: 'Todos'
	};

	$scope.status = [
		{
			id: 'Todos',
			descricao: 'Todos'
		},
		{
			id: 'A',
			descricao: 'Ativo'
		},
		{
			id: 'I',
			descricao: 'Inativo'
		}
	]

	var stopTabelaLoading = function() {
		$scope.tabelaProdutoLoading = false;
	}

	var startTabelaLoading = function() {
		$scope.tabelaProdutoLoading = true;
	}

	$scope.produto = {};
	$scope.produtoExclusao = {};
	$scope.setProdutoExclusao = function(produto) {
		$scope.produtoExclusao = produto;
	}

	$scope.findAllProductsPage = function(page) {
			startTabelaLoading();
			$promisePage = produtoService.findAllPageByFilter(page, $scope.pageSize, $scope.filtro);
			$promisePage.success(function(data) {
				$scope.produtosPage = data;
				stopTabelaLoading();
			}).error(function(data){
				stopTabelaLoading();
			});
	}

	$scope.pesquisar = function() {
		$scope.findAllProductsPage(0);
	}

	$scope.limparFiltroPesquisa = function() {
		$scope.filtro = {
			status: 'Todos'
		};
	}

	$scope.toggleStatus = function(indexProd) {
			startTabelaLoading();
			var idProd = $scope.produtosPage.content[indexProd].idProduto;
			$promisePage = produtoService.toggleStatus(idProd);
			$promisePage.success(function(data) {
				$scope.produtosPage.content[indexProd] = data.obj;
				stopTabelaLoading();
			}).error(function(data){
				stopTabelaLoading();
			});
			stopTabelaLoading();
	}

	$scope.del = function() {
		startTabelaLoading();
		$promiseDelete = produtoService.del($scope.produtoExclusao);
		$promiseDelete
			.success(function(data) {
				$scope.findAllProductsPage($scope.produtosPage.number);
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

	$scope.getValidatorMessageFor = function (campo) {
		if($scope.error) {
			var validacoes = $scope.error.validacoes;
			if(validacoes) {
				for(var i = 0; i < validacoes.length; i++)
				{
					if(validacoes[i].nomeCampo == campo)
					{

						return validacoes[i].mensagem;
					}
				}
			}
		}
		return null;
	}

	$scope.limparCampos = function() {
		$scope.produto = {};
		$scope.messageError = null;
	}


	var setPageSize = function(pageSize) {
		$scope.pageSize = pageSize;
	}

	var $promisePage = produtoService.findAllPageByFilter(0, $scope.pageSize, $scope.filtro);

	$promisePage.success(function(data) {
		$scope.produtosPage = data;
		stopTabelaLoading();
	});

	$scope.getPages = function(num) {
		return new Array(num);
	}

}

var depends = [
   '$scope',
	'$mdToast',
   'APP_CONFIG',
   'produtoService',
   consultaProdutosController
]

angular.module('myApp').controller('consultaProdutosController', depends);
