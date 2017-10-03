var app = angular.module("mgpHandler",[]);

app.controller('mgpRuleEditCtrl', function($scope){
	$scope.editAlive = true;
	$scope.user = {};
	// controller for rule editor
  $scope.user.boxRule = {}
  $scope.user.genRule = {}
  $scope.user.boxRule.stayAlive = {}
  $scope.user.genRule.stayAlive = {list: [1,2,3,4,5,6,7,8], current: 1}
  $scope.user.boxRule.toAlive = {}
  $scope.user.genRule.toAlive = {list: [1,2,3,4,5,6,7,8], current: 1}
});

app.directive('boxRuleEditor', function(){
	return {
		scope: {
      type: '='
		},
		restrict: 'E',
		//require: '^ngModel',
		replace: true,
		templateUrl: 'box-rule-editor.html',
		link: function(scope, element, attrs){
      
		}
  }
});

app.directive('genRuleEditor', function(){
	return {
		scope: {
      type: '='
		},
		restrict: 'E',
		//require: '^ngModel',
		replace: true,
		templateUrl: 'gen-rule-editor.html',
		link: function(scope, element, attrs){
      
		}
  }
});


