'use strict';

angular.module('newsletterApp')
  .directive('newsletterCanvas', function ($window) {
    return {
      //templateUrl: 'app/newsletter-canvas/newsletter-canvas.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	//set up canvas
		var canvas = element[0];
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight;
		var cx = canvas.getContext('2d');

		var letter = {
			height: scope.newsletterSections.Page._HEIGHT,
			width: scope.newsletterSections.Page._WIDTH,
			scale: 100
		};

		var view = {
			x: canvas.width/2 - (letter.width * letter.scale / 2),
			y: canvas.height/2 - (letter.height * letter.scale / 2),
			width: canvas.width,
			height: canvas.height,

			move: false,
			select: null
		};

      }
    };
  });