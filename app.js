'use strict'var myapp = angular.module('myapp', ['ui.router','ui.navbar','ncy-angular-breadcrumb',                                      'mgo-angular-wizard', 'ngMessages', 'ngTable', 'ui.bootstrap']);myapp.config(["$provide", "$stateProvider", "$urlRouterProvider", "webserviceProvider", "storageServiceProvider", function ($provide, $stateProvider, $urlRouterProvider, 		webserviceProvider, storageServiceProvider) {	/*set to true when stub have to be used*/	var useStub = false;	webserviceProvider.setBaseUrl('http://10.217.147.208:7001/');	if (useStub) {		webserviceProvider.setStub('http://10.217.147.208:7001/pcmsgui/stub');	}	$urlRouterProvider.otherwise('/login');	$stateProvider.state('login', {		url: '/login',		templateUrl: 'pages/login.html',		controller: 'LoginCtrlr'	}).state('tags', {		url: '/tags',		templateUrl: 'pages/tags.html',		controller: 'TagManagerCtrl',		ncyBreadcrumb: {			label: 'Tags'		}	}).state('catalog', {		url: '/catalog',		template: '<div ui-view></div>'	}).state('catalog.tags', {		url: '/tags',		templateUrl: 'pages/tags.html',		controller: 'TagManagerCtrl',		ncyBreadcrumb: {			label: 'Tags'		}	}).state('catalog.createtag', {		url: '/tags/create',		templateUrl: 'pages/createtag.html',		controller: 'CreateController',		ncyBreadcrumb: {			label: 'Create Tag'		}	}) .state('catalog.createtag.basic', {		url: '/basic',		templateUrl: 'pages/partials/information-tag.html',		controller: 'CreateController',		ncyBreadcrumb: {			label: 'Basic'		}	}) .state('catalog.createtag.addentity', {		url: '/addentities',		templateUrl: 'pages/partials/add-entities.html',		controller: 'AddController',		ncyBreadcrumb: {			label: 'Add Enitites'		}	});	}]);myapp.run(["apiFactory", "storageService", function (apiFactory, storageService) {	/* app run features goes here */}]);
'use strict';

(function () {

    /**
     * Config
     */
    var moduleName = 'ngBreadCrumb';
    var templateUrl = 'pages/breadcrumbtemplate.html';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, ['ui.router']);
    }

    module.directive('uiBreadcrumbs', ["$interpolate", "$state", function ($interpolate, $state) {
        return {
            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || templateUrl;
            },
            scope: {
                displaynameProperty: '@',
                abstractProxyProperty: '@?'
            },
            link: function (scope) {
                scope.breadcrumbs = [];
				
				function updateBreadcrumbsArray() {
                    var workingState;
                    var displayName;
                    var breadcrumbs = [];
                    var currentState = $state.$current;

                    while (currentState && currentState.name !== '') {
                        workingState = getWorkingState(currentState);
                        if (workingState) {
                            displayName = getDisplayName(workingState);

                            if (displayName !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
                                breadcrumbs.push({
                                    displayName: displayName,
                                    route: workingState.name
                                });
                            }
                        }
                        currentState = currentState.parent;
                    }
                    breadcrumbs.reverse();
                    scope.breadcrumbs = breadcrumbs;
                }
				
                if ($state.$current.name !== '') {
                    updateBreadcrumbsArray();
                }
                scope.$on('$stateChangeSuccess', function () {
                    updateBreadcrumbsArray();
                });

                /**
                 * Start with the current state and traverse up the path to build the
                 * array of breadcrumbs that can be used in an ng-repeat in the template.
                 */
                

              
                function getWorkingState(currentState) {
                    var proxyStateName;
                    var workingState = currentState;
                    if (currentState.abstract === true) {
                        if (typeof scope.abstractProxyProperty !== 'undefined') {
                            proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState);
                            if (proxyStateName) {
                                workingState = $state.get(proxyStateName);
                            } else {
                                workingState = false;
                            }
                        } else {
                            workingState = false;
                        }
                    }
                    return workingState;
                }

               
                function getDisplayName(currentState) {
                    var interpolationContext;
                    var propertyReference;
                    var displayName;

                    if (!scope.displaynameProperty) {
                        // if the displayname-property attribute was not specified, default to the state's name
                        return currentState.name;
                    }
                    propertyReference = getObjectValue(scope.displaynameProperty, currentState);

                    if (propertyReference === false) {
                        return false;
                    } else if (typeof propertyReference === 'undefined') {
                        return currentState.name;
                    } else {
                        // use the $interpolate service to handle any bindings in the propertyReference string.
                        interpolationContext = (typeof currentState.locals !== 'undefined') ? 
						currentState.locals.globals : currentState;
                        displayName = $interpolate(propertyReference)(interpolationContext);
                        return displayName;
                    }
                }

            
                function getObjectValue(objectPath, context) {
                    var i;
                    var propertyArray = objectPath.split('.');
                    var propertyReference = context;

                    for (i = 0; i < propertyArray.length; i++) {
                        if (angular.isDefined(propertyReference[propertyArray[i]])) {
                            propertyReference = propertyReference[propertyArray[i]];
                        } else {
                            // if the specified property was not found, default to the state's name
                            return undefined;
                        }
                    }
                    return propertyReference;
                }

              
                function stateAlreadyInBreadcrumbs(state, breadcrumbs) {
                    var i;
                    var alreadyUsed = false;
                    for (i = 0; i < breadcrumbs.length; i++) {
                        if (breadcrumbs[i].route === state.name) {
                            alreadyUsed = true;
                        }
                    }
                    return alreadyUsed;
                }
            }
        };
    }]);
})();
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
	
    .directive('leaf', ["$compile", function ($compile) {
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
    }]);
'use strict'
angular.module('myapp').controller('LoginCtrlr', 
["$scope", "$http", "apiFactory", "$location", function ($scope,$http,apiFactory,$location) {
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

}]);
'use strict'
angular.module('myapp').controller('TagManagerCtrl', ["$scope", "apiFactory", "NgTableParams", function ($scope, apiFactory, NgTableParams) {
    var tagItems = [];
    $scope.advanceFlag = true;
    $scope.hidesearchPanel = true;
    var self = this;
    apiFactory.tagManagerSearchAllItems().then(function (response) {
        $scope.displayTag(response);
    },
            function () {
                $scope.showItemsError = true;
            });

    $scope.advancedSearch = function () {
        $scope.advanceFlag1 = true;
        $scope.advanceFlag = false;

    };
   
    $scope.hideSearch = function () {
        $scope.hidesearchPanel = false;
    }

    $scope.searchTag = function () {
    	var tagDetails = {};
		tagDetails.id = $scope.tagId;
		tagDetails.name = $scope.tagName;
		tagDetails.fromCrDt = $scope.dfrom;
		tagDetails.toCrDt = $scope.dto;
		
		 apiFactory.tagManagerSearchItem(tagDetails).then(function (response) {
			console.log('Resp'+response);
			//$scope.displayTag 
			//self.tableParams.count(newSize);
			self.tableParams.count(0);
			$scope.displayTag(response);
			
			//tableParams.$params.count = 0;
			
	
    },function() {
		console.log('error');
	});

    };
    $scope.displayTag = function (response) {
        $scope.showItemsFlag = true;
        tagItems = response;



        //alert();
        self.tableParams = new NgTableParams({count: 5}, {counts: [5, 10, 15], data: tagItems});
        self.selectedPageSizes = self.tableParams.settings().counts;
        self.availablePageSizes = [5, 10, 15, 20, 25, 30, 40, 50, 100];        
        self.tableParams.reload();
    };



    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    /* $scope.disabled = function(date, mode) {
     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
     };*/

    $scope.toggleMin = function () {
        $scope.minDate = new Date(2000, 5, 22);
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };
    $scope.open1 = function ($event) {
        $scope.status.opened1 = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

}]);

'use strict'
angular.module('myapp').controller('AddController',
		["$scope", "apiFactory", "NgTableParams", function ($scope, apiFactory, NgTableParams) {	
	$scope.wizardData = [
	                     {'step1': {'current': 'false', 'default': 'false', 'done': 'true'}},
	                     {'step2': {'current': 'true', 'default': 'false', 'done': 'false'}}
	                     ]

}]
);	
'use strict'
angular.module('myapp').controller('CreateController',
        ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
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
        }]
);
'use strict'
angular.module('myapp').controller('NavController', ["$scope", function($scope){
	$scope.tree = [{
	    name: 'Offers',
	    link: '#'	   
	  },
	  {
	    name: 'Product Specifications',
		link: '#'
	  },
	  {
	    name: 'Prices',
		link: '#'
	  },
	  {
	    name: 'Characteristics',
		link: '#'
	  },
	  {
	    name: 'Offer Lines',
		link: '#'
	  },
	  {
	    name: 'Resource Specifications',
		link: '#'
	  },
	  {
	    name: 'Resource Specifications Groups',
		link: '#'
	  },
	  {
	    name: 'Channel',
		link: '#'
	  },
	  {
	    name: 'Tags',
		link: 'tags'
	  }];
	  $scope.tree1 = [{
	    name: 'Import1',
	    link: '#',
	    subtree: [{
	      name: 'Sub Import1',
	      link: 'subimport1',
          subtree: [{name: 'Level1',
                     link: 'level1'
					 },
					 {
					  name: 'Level2',
					  link: 'level2'
					 }]		  
	    }, 
		{
		    name: 'Sub Import2',
			link: 'subimport2'
		}]
	  }];
}]);
'use strict'
angular.module('template/navbar-li.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/navbar-li.html',
    '<li ng-class=\'{divider: leaf.name == "divider"}\'>\n' +
    '    <a ui-sref=\'{{leaf.link}}\' ng-if=\'leaf.name !== "divider"\'>{{leaf.name}}</a>\n' +
    '</li>');
}]);

'use strict'
angular.module('template/navbar-ul.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/navbar-ul.html',
    '<ul class="dropdown-menu">\n' +
    '    <leaf ng-repeat="leaf in tree" leaf="leaf"></leaf>\n' +
    '</ul>');
}]);

'use strict'
angular.module('myapp').factory('apiFactory', ["webservice", function (webservice) {
	var type = 'json';
    return {
        login: function (req) {
        	type = 'form';
            return webservice.makeApiCall('pcmsgui/api/authenticateuser/getLoginInfo', {'uname':req.uname,
				   'pass':req.pass}, 'POST', type);
        },
        tagManagerSearchItem: function (tagSearchInfo) {
            return webservice.makeApiCall('pcmsgui/api/TagsService/searchTags',
            	   {'tagId':tagSearchInfo.id, 'tagName':tagSearchInfo.name, 
            	'tagFromDt':tagSearchInfo.fromCrDt, 'tagToDt':tagSearchInfo.toCrDt }, 'POST', type);
        },
        tagManagerSearchAllItems: function () {
            return webservice.makeApiCall('pcmsgui/api/TagsService/searchTags', {}, 'POST', type);
     
        }
    };
}]);
'use strict'
angular.module('myapp').factory('getArticle', ["$http", function($http) {
			return{
			getData: function(a){
			return $http ({
				url:'src/stub/default.json',
				method: 'GET'
			});
			}
			}
		}]);


'use strict'
angular.module('myapp').provider('storageService', function () {
    var appPrefix = 'pcms.';

    this.$get = function () {
        return {
            appPrefix: appPrefix,
            localStorage: window.localStorage,
            set: function (key, value) {
                if (value === 'undefined')
                    value = null;
                if (angular.isObject(value) || angular.isArray(value)) {
                    value = angular.toJson(value);
                }
                this.localStorage.setItem(this.appPrefix + key, value);
            },
            get: function (key) {
                var value = this.localStorage.getItem(this.appPrefix + key);
                if (!value)
                    return null;
                if (value.charAt(0) === '{' || value.charAt(0) === '[') {
                    var result = null;
                    try {
                        result = angular.fromJson(value);
                    } catch (e) {
                    }
                    return result;
                }
                return value;
            },
            remove: function (key) {
                this.localStorage.removeItem(this.appPrefix + key);
            },
            clearAll: function () {
                var prefixLength = this.appPrefix.length;
                for (var key in this.localStorage) {
                    // Only remove items that are for this app
                    if (key.substr(0, prefixLength) === this.appPrefix) {
                        this.localStorage.removeItem(key);
                    }
                }
            }
        };
    };
});
'use strict'
angular.module('myapp').provider('webservice', function () {
    var baseUrl; //set base URL for API
    var headers;
    var datainfo;

    this.setBaseUrl = function (url) {
        baseUrl = url;
    };

    this.setStub = function (stubUrl) {
        baseUrl = stubUrl;
    };

    this.$get = ["$http", "$q", function ($http, $q) {
        return {
            baseUrl: baseUrl,
            getBaseUrl: function () {
                return baseUrl;
            },
            makeApiCall: function (uri, params, method, headersrc) {
                var _method = method || 'GET';
                var _params = params || null;
                var deffered = $q.defer();
                if(headersrc === 'json')
                	{
                		 headers = {'Content-Type': 'application/json'};
                		 datainfo = params;
                	}
                else if(headersrc === 'form')
                	{
                		headers = {'Content-Type': 'application/x-www-form-urlencoded'};
                		datainfo = $.param(_params);
                	}
                var url = this.getBaseUrl() + uri;
                $http({
                    method: _method,
                    url: url,
                    data: datainfo,
                    header: headers,
                    timeout: 60000
                }).success(function (response) {
                    deffered.resolve(response, true);
                }).error(function (status) {
                    deffered.reject(status);
                });
                return deffered.promise;
            }
        };
    }];
});

