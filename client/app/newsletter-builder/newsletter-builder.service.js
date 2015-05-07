'use strict';

angular.module('newsletterApp')
  .factory('newsletterBuilder', function ($window) {
    return function (canvasElement, pageData) {
      var display = this;

      var canvas = canvasElement[0];
      canvas.width = $window.innerWidth;
      canvas.height = $window.innerHeight;
      var cx = canvas.getContext('2d');

      var touch = {};

      var letter = {
        height: pageData.Page._HEIGHT,
        width: pageData.Page._WIDTH,
        scale: 100,
        image: new Image()
      };

      letter.image.src = '/assets/images/Pg001.png';
      letter.image.onload = function() {console.log('image loaded');letterRenderer()};

      var view = {
        x: canvas.width/2 - (letter.width * letter.scale / 2),
        y: canvas.height/2 - (letter.height * letter.scale / 2),
        width: canvas.width,
        height: canvas.height,

        move: false,
        select: null
      };



      //public methods
      this.letterRenderer = letterRenderer;

      function letterRenderer() {

        var color = 100;

        // display.cx.fillStyle = 'blue';
        // display.cx.fillRect( 0, 0, this.letter.width, this.letter.height);

        console.log(letter.image);
        cx.drawImage(letter.image, 0, 0);

        pageData.Page.Entity.forEach(innerElement);

        function innerElement(element, index, array) {
          var locationArray = element._BOX.split(" ");

          function drawLoc(location, size) {
            return location * 100 / size * 8 ;
          }

          cx.fillStyle = '#'+color;
          cx.fillRect( 
            drawLoc(locationArray[0], letter.width), 
            drawLoc(locationArray[1], letter.height), 
            drawLoc(locationArray[2]-locationArray[0], letter.width),
            drawLoc(locationArray[3]-locationArray[1], letter.height)
          );

          color+=5;

          if (Array.isArray(element.Block)) {
            element.Block.forEach(innerElement);
          } else if (element.Block) {
            innerElement(element.Block);
          }
        };


      }
    }
  });
