'use strict';

angular.module('newsletterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'cb.x2js'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });