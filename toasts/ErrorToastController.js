(function(){

   var errorToastController = function($scope, $mdToast, $mdDialog, msgErro) {

      $scope.mensagemErro = msgErro;

      $scope.closeToast = function() {
         $mdToast.hide();
      };
   }


   var depends = [
      '$scope',
      '$mdToast',
      '$mdDialog',
      'msgErro',
      errorToastController
   ]

   angular.module('myApp').controller('errorToastController', depends);
})()
