var app = angular.module("mgpHandler",[]);
var dataToClient = {};

app.controller('mgpRuleEditCtrl', function($scope, $http){
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
      var res = $http.post('/data', $scope.user);
      res.then(function(data){
        console.log('data posted')
      })
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
      // Could implement a form validator here
		}
  }
});


app.controller('mgpGameCtrl', function($scope, $http){
  // for debugging, future features
});
