'use strict';

angular.module('newsletterApp')
  .controller('MainCtrl', function ($scope, $http, $window, x2js, newsletterBuilder) {
    $scope.newsletterSections = null;

    $http.get('/api/page1').success(function(data) {
      	$scope.newsletterSections = x2js.xml_str2json(data);
      	console.log($scope.newsletterSections);

      	$scope.currentPage = new newsletterBuilder($scope.newsletterCanvas, $scope.newsletterSections);

      	$scope.currentPage.zoomOut();

      	
	    //resizes canvas if window size changes
	    $window.onresize = function () {
			$scope.currentPage.canvasResize($window.innerWidth, $window.innerHeight);
	    }
    });

  });
