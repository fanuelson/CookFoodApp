(function() {

   function caixaController($scope, APP_CONFIG) {
      var vm = $scope;

   

   }

   var depends = [
      '$scope',
		'APP_CONFIG',
      caixaController
   ]

   angular.module('myApp').controller('caixaController', depends);
})();
