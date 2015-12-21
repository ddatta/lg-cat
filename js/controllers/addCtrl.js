'use strict'
angular.module('myapp').controller('AddController',
		function ($scope, apiFactory, NgTableParams) {	
	$scope.wizardData = [
	                     {'step1': {'current': 'false', 'default': 'false', 'done': 'true'}},
	                     {'step2': {'current': 'true', 'default': 'false', 'done': 'false'}}
	                     ]

}
);	