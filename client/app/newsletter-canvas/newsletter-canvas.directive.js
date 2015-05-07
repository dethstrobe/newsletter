'use strict';

angular.module('newsletterApp')
  .directive('newsletterCanvas', function ($window) {
    return {
      //templateUrl: 'app/newsletter-canvas/newsletter-canvas.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	scope.newsletterCanvas = element;


	    //resizes canvas if window size changes
	    $window.onresize = function () {
			scope.currentPage.canvasResize($window.innerWidth, $window.innerHeight);
	    }

	    //event listeners
	    element.on('mousedown', function(event) {
          scope.currentPage.letterMove(event);
        });

      }
    };
  });