'use strict'
angular.module('myapp').controller('LoginCtrlr', 
function ($scope,$http,apiFactory,$location) {
	var userDetails = {};
	
	$scope.login = function() {	
		userDetails.uname = $scope.username;
		userDetails.pass = $scope.password;
		apiFactory.login(userDetails).then(function(response){
			if(response.status === 1){
				$location.path('/tagmanager');	
			
			}else {
				$scope.loginerror = true;
				$scope.username='';
				$scope.password='';
			}
			
			
		});
	}

});