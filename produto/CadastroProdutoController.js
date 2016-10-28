(function() {

	function cadastroProdutoController($scope, APP_CONFIG ,produtoService, insumoService) {

		$scope.headerMessage = "Cadastro de Produto";

		$scope.pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE;

		$scope.formProdutoLoading = false;

		$scope.produto = {};
		$scope.produto.composicoes = [];
		$scope.composicao = {};

		$scope.save = function() {
			$scope.formProdutoLoading = true;
			var produtoJson = angular.toJson($scope.produto);
			$promiseSave = produtoService.save(produtoJson);
			$promiseSave.success(function(data) {
				$scope.retornoSucesso = data;
				$scope.formProdutoLoading = false;
				$scope.produto = {};
				$scope.produto.composicoes = [];
				$scope.composicao = {};
				$scope.error = null;
			})
			.error(function(data){
				$scope.error = data;
				$scope.formProdutoLoading = false;
			});
		}

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

		$scope.findAllInsumos = function() {
			$promiseFindAll = insumoService.findAll();

			$promiseFindAll.success(function(data) {
				$scope.insumos = data;
			})
			.error(function(data){
				$scope.error = data;
			});
		}

		$scope.setInsumoSelecionado = function(insumo) {
			insumo.medida = insumo.medida.abreviacao;
			$scope.composicao.insumo = insumo;
		}

		$scope.adicionarComposicao = function() {
			$scope.limparMensagemSucesso();
			if(!$scope.error){
				$scope.error = {};
				$scope.error.camposObrigatorios = {};
			}
			var coError = {};
			$scope.error.camposObrigatorios = {};
			if(!$scope.composicao.gasto) {
				coError = angular.extend(coError, {"gasto": "Gasto é Obrigatório."});
			}
			if(!$scope.composicao.insumo) {
				coError = angular.extend(coError, {"insumo": "Insumo é Obrigatório."});
			}
			$scope.error.camposObrigatorios = coError;

			if($scope.composicao.insumo && $scope.composicao.gasto){
				removerComposicaoDadoInsumo($scope.composicao.insumo);
				$scope.produto.composicoes.push($scope.composicao);
				$scope.composicao = {};
				$scope.error = null;
			}
		}

		$scope.removerComposicao = function(index) {
			$scope.produto.composicoes.splice(index, 1);
		}

		$scope.produtoIsInvalid = function() {
			return S($scope.produto.nome).isEmpty()
			|| !$scope.produto.composicoes
			|| $scope.produto.composicoes.length <= 0;
		}

		$scope.limparCampos = function() {
			$scope.retornoSucesso = {};
			$scope.produto = {};
			$scope.produto.composicoes = [];
			$scope.error = {};
			$scope.findAllInsumos();
		}

		$scope.limparMensagemSucesso = function() {
			$scope.retornoSucesso = {};
		}

		var removerComposicaoDadoInsumo = function(insumo) {
			$scope.produto.composicoes.forEach(function(val, i){
				if(insumo.id == val.insumo.id){
					$scope.produto.composicoes.splice(i, 1);
				}
			});
		}


		$scope.findAllInsumos();
	}

	var depends = [
		'$scope',
		'APP_CONFIG',
		'produtoService',
		'insumoService',
		cadastroProdutoController
	]

	angular.module('myApp').controller('cadastroProdutoController', depends);
	
})();
