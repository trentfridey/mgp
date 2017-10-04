var app = angular.module("mgpHandler",[]);

app.controller('mgpRuleEditCtrl', function($scope){
	$scope.editAlive = true;
	$scope.user = {};
	// controller for rule editor
  $scope.user.boxRule = {}
  $scope.user.genRule = {}
  $scope.user.boxRule.stayAlive = [{ctrl1: false, ctrl2: false, ctrl3: false, ctrl4: false, ctrl5: false, ctrl6: false, ctrl7:false, ctrl8:false}]
  $scope.user.genRule.stayAlive = [{list: [1,2,3,4,5,6,7,8], current: 2}, {list: [1,2,3,4,5,6,7,8], current: 3}]
  $scope.user.boxRule.toAlive = [{ctrl1: false, ctrl2: false, ctrl3: false, ctrl4: false, ctrl5: false, ctrl6: false, ctrl7:false, ctrl8:false}]
  $scope.user.genRule.toAlive = [{list: [1,2,3,4,5,6,7,8], current: 3}]
  $scope.submit = function() {
    // Submit the form for processing
    return true;
  }
  $scope.reset = function() {
    // Reset the form to default
    $scope.user.boxRule.stayAlive = [{ctrl1: false, ctrl2: false, ctrl3: false, ctrl4: false, ctrl5: false, ctrl6: false, ctrl7:false, ctrl8:false}]
    $scope.user.boxRule.toAlive = [{ctrl1: false, ctrl2: false, ctrl3: false, ctrl4: false, ctrl5: false, ctrl6: false, ctrl7:false, ctrl8:false}]
    $scope.user.genRule.stayAlive = [{list: [1,2,3,4,5,6,7,8], current: 2}, {list: [1,2,3,4,5,6,7,8], current: 3}]
    $scope.user.genRule.toAlive = [{list: [1,2,3,4,5,6,7,8], current: 3}]
    // Needs to update the $viewValue
  }
});

app.directive('boxRuleEditor', function(){
	return {
		scope: {
      type: '='
		},
		restrict: 'E',
		require: '^ngModel',
		replace: true,
		templateUrl: 'box-rule-editor.html',
		link: function(scope, element, attrs, ngModel){
      if(!ngModel) return;
      scope.togglePixel = function(id,pixel) {
        scope.type[id][pixel] = !ngModel.$viewValue[id][pixel]
        console.log(scope.type[id])
      }
      scope.$render = function(){
        scope.type = ngModel.$viewValue
      }
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


