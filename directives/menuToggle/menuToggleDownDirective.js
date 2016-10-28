var menuToggleDownDirective = function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
            $(elem).bind('click', function() {
               var menusBelow = $(elem).next();
               menusBelow.toggle(100);

               var icone = $(elem).children();
               if(icone.hasClass("up")){
                  icone.removeClass("up");
                  icone.addClass("down");
               } else if(icone.hasClass("down")) {
                  icone.removeClass("down");
                  icone.addClass("up");
               }
            });

        }
    }
}

angular.module('myApp').directive("menuToggleDown", menuToggleDownDirective);
