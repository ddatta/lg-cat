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

    this.$get = function ($http, $q) {
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
    };
});

