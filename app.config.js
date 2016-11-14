(function() {

	"use strict";

	/* -- CONSTANTS CONFIG -- */
	angular.module('myApp').constant(
		"APP_CONFIG", {
			"REST_BASE_URL" : "http://localhost:8080/SpringAngularApp/api",
			"DEFAULT_PAGE_SIZE": 10
		}
	);
	/* -- CONSTANTS CONFIG -- */

	/* -- MATERIAL CONFIG -- */
	var configTheme = function($mdThemingProvider){
		// Update the theme colors to use themes on font-icons
		$mdThemingProvider.theme('default')
		.primaryPalette("blue")
		.warnPalette('red');
	};

	var configDateFormat = function($mdDateLocaleProvider) {
		$mdDateLocaleProvider.formatDate = function(date) {
			var m = moment(date);
			return m.isValid() ? m.format('DD/MM/YYYY') : null;
		};
	};

	angular.module('myApp').config(configTheme);
	angular.module('myApp').config(configDateFormat);
	/* -- END MATERIAL CONFIG -- */

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

	/* ROUTE AUTH LISTENER */
		angular.module('myApp').run(function ($rootScope, $state, $location, tokenService) {

		    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		    	if(toState.name != 'login') {
		    		if(!tokenService.hasToken()) {
		    			$state.go('login');
		    	        event.preventDefault();
		    	        return;
		    		}
		    	}


		    });
		});

	/* END ROUTE AUTH LISTENER */

	angular.module('myApp').directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});

})();
