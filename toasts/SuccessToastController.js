(function(){

   var successToastController = function($scope, $mdToast, $mdDialog, msgSuccess) {

      $scope.msgSuccess = msgSuccess;

      $scope.closeToast = function() {
         $mdToast.hide();
      };
   }


   var depends = [
      '$scope',
      '$mdToast',
      '$mdDialog',
      'msgSuccess',
      successToastController
   ]

   angular.module('myApp').controller('successToastController', depends);
})()
