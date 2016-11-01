(function() {

   'use strict'

   var semanticUiSelectItemsDirective = function() {
      return {
         restrict: 'A',
         link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (v) {
               scope.$$postDigest(function () {
                  if(v){
                     $(element).val(v).change();
                  }
               });
            });
         }
      };
   }

   var dep = [
      semanticUiSelectItemsDirective
   ];

   angular.module('myApp')
      .directive('semanticUiSelectItems', dep);
})();
