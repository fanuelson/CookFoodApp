function insumoService($http, APP_CONFIG) {

	var resource = "/insumos" ;

	var rest_resource_url = APP_CONFIG.REST_BASE_URL + resource;


	this.findAll = function() {
		return $http.get(rest_resource_url);
	};

	this.findOne = function(idInsumo) {
		return $http.get(rest_resource_url + "/" + idInsumo);
	};

	this.findAllPage = function(page, size) {
		var pageParams = "?page=" + page + "&size=" + size;
		return $http.get(rest_resource_url + '/page' + pageParams);
	};

	this.findAllPageFilterBy = function(filtro, page, size) {
		var pageParams = "?page=" + page + "&size=" + size;
		return $http.post(rest_resource_url + '/page/filterBy' + pageParams, filtro);
	};

	this.save = function(insumo) {
		return $http.post(rest_resource_url, insumo);
	};

	this.del = function(idInsumo) {
		return $http.delete(rest_resource_url + '/' + idInsumo);
	};

	this.downloadReport = function() {
		return $http.get(rest_resource_url + '/relatorio', { responseType: 'arraybuffer' });
	};

};

var depends = [
	'$http',
	'APP_CONFIG',
	insumoService
];

angular.module('myApp').service('insumoService', depends);
