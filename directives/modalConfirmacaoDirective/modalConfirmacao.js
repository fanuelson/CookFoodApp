(function(){

	var modalConfirmacaoDirective = function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				'onClickYes': '&onClickYes',
				'onClickNo': '&onClickNo',
				'isBtnYesDisabled' : '=',
				'isBtnNoDisabled' : '=',
				'mensagem': '='
			},
			replace: true,
			templateUrl: 'directives/modalConfirmacaoDirective/modalConfirmacaoTemplate.html'
		};
	}

	angular.module('myApp').directive('modalConfirmacao', modalConfirmacaoDirective);
})();
