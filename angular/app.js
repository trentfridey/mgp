var angular = require('angular');

var app = angular.module("mgpHandler", ['ngResource']);

app.controller('mgpRuleEditCtrl', function($scope){
	$scope.editAlive = true;
	$scope.user = {};
	if($scope.editAlive){
		$scope.user.stayAlive.general = {rules: ['2','3']};
		$scope.user.stayAlive.box = {rules: {rule: 1, on: []}};
		$scope.user.toAlive.general = {rules: ['3']};
		$scope.user.toAlive.box = {rules: {rule: 1, on: []}};
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


