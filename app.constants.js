(function(){

   "use strict";

   angular.module('myApp').constant(
      "APP_CONFIG", {
         "REST_BASE_URL" : "http://localhost:8080/SpringAngularApp/api",
         "DEFAULT_PAGE_SIZE": 10
      }
   );

})();
