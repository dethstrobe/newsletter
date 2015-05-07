'use strict';

angular.module('newsletterApp')
  .controller('MainCtrl', function ($scope, $http, x2js) {
    $scope.newsletterSections = null;

    $http.get('/api/page1').success(function(data) {
      	$scope.newsletterSections = x2js.xml_str2json(data);
      	console.log($scope.newsletterSections);
    });

  });
