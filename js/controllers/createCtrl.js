'use strict'
angular.module('myapp').controller('CreateController',
        function ($rootScope, $scope, $http) {
            $scope.data = '';
            $scope.error='false';
            $scope.wizardData = [
                {'step1': {'current': 'true', 'default': 'false', 'done': 'false'}},
                {'step2': {'current': 'false', 'default': 'true', 'done': 'false'}}
            ]
            $scope.save = function (tag) {                
                $scope.data = angular.copy($scope.tag);
            };
            
            $scope.reset = function () {
                $scope.tag = angular.copy($scope.data);
            };
        }
);