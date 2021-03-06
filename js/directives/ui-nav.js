'use strict'
angular.module('ui.navbar', ['ui.bootstrap', 'template/navbar-ul.html', 'template/navbar-li.html'])

    .directive('tree', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tree: '=',
				tree1: '='
            },
            templateUrl: 'template/navbar-ul.html'
        };
    })
	
    .directive('leaf', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                leaf: '='
            },
            templateUrl: 'template/navbar-li.html',
            link: function (scope, element, attrs) {
                if (angular.isArray(scope.leaf.subtree)) {
                    element.append('<tree tree=\"leaf.subtree\"></tree>');
                    var parent = element.parent();
                    var classFound = false;
                    while(parent.length > 0 && !classFound) {
                      if(parent.hasClass('navbar-right')) {
                        classFound = true;
                      }
                      parent = parent.parent();
                    }
                    
                    if(classFound) {
                      element.addClass('dropdown-submenu-right');
                    } else {
                     element.addClass('dropdown-submenu');
                    }
                    
                    $compile(element.contents())(scope);
                }
            }
        };
    });