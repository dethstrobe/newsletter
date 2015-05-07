'use strict';

angular.module('newsletterApp')
  .controller('MainCtrl', function ($scope, $http, ) {
    $scope.awesomeThings = [];

    $http.get('/api/page1').success(function(data) {
      $scope.awesomeThings = awesomeThings;
    });

  });
