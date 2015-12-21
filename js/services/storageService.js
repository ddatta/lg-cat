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