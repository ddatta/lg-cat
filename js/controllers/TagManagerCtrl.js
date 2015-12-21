'use strict'
angular.module('myapp').controller('TagManagerCtrl', function ($scope, apiFactory, NgTableParams) {
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

});
