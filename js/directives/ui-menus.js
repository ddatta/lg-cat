'use strict'
angular.module('myapp')
.directive('submenus', function () {
        return {
            restrict: 'A',
            replace: true,
            controller: 'NavController',
            templateUrl: 'pages/menus.html',
			link : function (scope, controller) {
                scope.message = 'Hello World!';
            }
        };
    });