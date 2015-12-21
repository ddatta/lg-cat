'use strict'
angular.module('myapp').controller('NavController', function($scope){
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
});