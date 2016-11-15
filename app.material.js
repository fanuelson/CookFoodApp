(function(){

   'use strict';

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

})();
