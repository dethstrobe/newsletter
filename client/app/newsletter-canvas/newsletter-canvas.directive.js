'use strict';

angular.module('newsletterApp')
  .directive('newsletterCanvas', function ($window) {
    return {
      //templateUrl: 'app/newsletter-canvas/newsletter-canvas.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	scope.newsletterCanvas = element;


	    //event listeners
	    element.on('mousedown', function(event) {
          scope.currentPage.letterMove(event);
        });

      }
    };
  });