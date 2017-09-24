var app = angular.module("mgpHandler",[]);

app.controller('mgpRuleEditCtrl', function($scope){
	$scope.editAlive = true;
	$scope.user = {};
	if($scope.editAlive){
		$scope.user.stayAlive = {}
	}
	// controller for rule editor
});

app.directive('mgpRuleEditor', function(){
	return {
		scope: {
			type: '='
		},
		restrict: 'E',
		require: '^ngModel',
		replace: true,
		templateUrl: 'rule-editor.html',
		link: function(scope, element, attrs, ngModel){
			if(!ngModel) return;
			
		}
  }
});


