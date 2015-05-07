'use strict';

angular.module('newsletterApp')
  .controller('MainCtrl', function ($scope, $http, x2js, newsletterBuilder) {
    $scope.newsletterSections = null;

    $http.get('/api/page1').success(function(data) {
      	$scope.newsletterSections = x2js.xml_str2json(data);
      	console.log($scope.newsletterSections);

      	$scope.currentPage = new newsletterBuilder($scope.newsletterCanvas, $scope.newsletterSections);

      	$scope.currentPage.letterRenderer();
    });

  });
