(function() {

   function calculadoraCedulaController($scope, APP_CONFIG) {
      var vm = $scope;

      vm.cedulas = [
            2,
            5,
            10,
            20,
            50,
            100
      ]

      vm.calcModel = [];

      var initCalcModel = function() {
         vm.cedulas.forEach(function(val, i) {
            var model = {
               cedula: val,
               quantidade: 0,
               soma:function(){
                  return this.cedula * this.quantidade;
               }
            }
            vm.calcModel.push(model);
         });
      }

      vm.somaTotal = function() {
         var somaTotal = 0;
         vm.calcModel.forEach(function(val, i){
            somaTotal += val.soma();
         })
         return somaTotal;
      }

      initCalcModel();

   }

   var depends = [
      '$scope',
		'APP_CONFIG',
      calculadoraCedulaController
   ]

   angular.module('myApp').controller('calculadoraCedulaController', depends);
})();
