(function() {
   'use strict' ;

   /* -- ROUTE CONFIG -- */
	var routeConfig = function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state("home", {
			  url: "/",
			  views: {
				  "starterContent":{
					  template: "<h1>HELLO<h1/>"
				  }
			  }
			})
			.state("login", {
			  url: "/login",
			  views: {
				  "starterContent":{
						 templateUrl: "login/login.html"
					 }
			  }
			})
			.state("gerenciador-pdv", {
			  url: "/gerenciador-pdv",
			  views: {
				  "starterContent":{
					  templateUrl: "pdv/gerenciar-pdv.html"
				  }
			  }
			})
			.state("caixa", {
			  url: "/caixa",
			  views: {
				  "starterContent":{
					  templateUrl: "caixa/caixa.html"
				  }
			  }
			})
			.state("calculadora-cedula", {
			  url: "/calculadora-cedula",
			  views: {
				  "starterContent":{
					  templateUrl: "calculadoraCedula/calculadoraCedula.html"
				  }
			  }
			})
			.state("cadastro-fornecedor", {
			  url: "/cadastro-fornecedor",
			  views: {
				  "starterContent":{
					  templateUrl: "fornecedor/cadastro-fornecedor.html"
				  }
			  }
			})
			.state("consulta-fornecedor", {
			  url: "/consulta-fornecedor",
			  views: {
				  "starterContent":{
					  templateUrl: "fornecedor/consulta-fornecedor.html"
				  }
			  }
			})
			.state("cadastro-insumo", {
				  url: "/cadastro-insumo",
				  params: {
		            idInsumo: null
		        },
				  views: {
						"starterContent":{
						 templateUrl: "insumo/cadastro-insumo.html"
						}
				  }
			})
			.state("consulta-insumos", {
				  url: "/consulta-insumo",
				  views: {
						"starterContent":{
						 templateUrl: "insumo/consulta-insumos.html"
						}
				  }
			})
			.state("cadastro-produto", {
				  url: "/cadastro-produto",
				  params: {
		            idProd: null
		        },
				  views: {
						"starterContent":{
							 templateUrl: "produto/cadastro-produto.html"
						}
				  }
			})
			.state("consulta-produtos", {
				  url: "/consulta-produtos",
				  views: {
						"starterContent":{
							 templateUrl: "produto/consulta-produtos.html"
						}
				  }
			});

	}

	var configRoute = [
		'$stateProvider',
		'$urlRouterProvider',
		routeConfig
	]

	angular.module('myApp').config(configRoute);

	/* -- END ROUTE CONFIG -- */
   
})();
