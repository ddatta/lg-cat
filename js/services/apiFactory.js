'use strict'
angular.module('myapp').factory('apiFactory', function (webservice) {
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
});