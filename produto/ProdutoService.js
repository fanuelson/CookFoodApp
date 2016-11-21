function produtoService($http, APP_CONFIG) {

	var rest_url = APP_CONFIG.REST_BASE_URL;

	this.findAllPage = function(page, size) {
		var pageParams = "?page="+page+"&size="+size;
		return $http.get(rest_url + '/produtos/page' + pageParams);
	};

	this.findAllPageByFilter = function(page, size, filtro) {
		var pageParams = "?page="+page+"&size="+size;
		return $http.post(rest_url + '/produtos/page/filterBy' + pageParams, filtro);
	};

	this.findOne = function(idProd) {
		return $http.get(rest_url + '/produtos/' + idProd);
	};

	this.toggleStatus = function(idProduto) {
		return $http.get(rest_url + '/produtos/'+idProduto+'/toggleStatus');
	};

	this.save = function(produto) {
		return $http.post(rest_url + '/produtos', produto);
	};

	this.del = function(produto) {
		return $http.delete(rest_url + "/produtos/" + produto.idProduto);
	};

};

var depends = [
	'$http',
	'APP_CONFIG',
	produtoService
];

angular.module('myApp').service('produtoService', depends);
