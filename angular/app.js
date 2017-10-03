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

app.directive('mgpRuleEditor', function(){
	return {
		scope: {
      type: '=',
      options: '=',
      selected: '='
		},
		restrict: 'E',
		require: '^ngModel',
		replace: true,
		templateUrl: 'rule-editor.html',
		link: function(scope, element, attrs, ngModel){
			if(!ngModel) return;
        scope.selectedOpt = function(opt){
          scope.selected = opt;
        }
      
		}
  }
});


