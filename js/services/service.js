'use strict'
angular.module('myapp').factory('getArticle', function($http) {
			return{
			getData: function(a){
			return $http ({
				url:'src/stub/default.json',
				method: 'GET'
			});
			}
			}
		});

