'use strict';

angular.module('newsletterApp')
  .factory('newsletterBuilder', function ($window) {
    return function (canvasElement, pageData) {
      var display = this;

      this.canvas = canvasElement[0];
      this.canvas.width = $window.innerWidth;
      this.canvas.height = $window.innerHeight;
      this.cx = this.canvas.getContext('2d');

      this.touch = {};

      this.letter = {
        height: pageData.Page._HEIGHT,
        width: pageData.Page._WIDTH,
        scale: 100
      };

      this.view = {
        x: this.canvas.width/2 - (this.letter.width * this.letter.scale / 2),
        y: this.canvas.height/2 - (this.letter.height * this.letter.scale / 2),
        width: this.canvas.width,
        height: this.canvas.height,

        move: false,
        select: null
      };


      //public methods
      this.letterRenderer = letterRenderer;

      function letterRenderer() {

        var color = 100;

        display.cx.fillStyle = 'blue';
        display.cx.fillRect( 0, 0, this.letter.width, this.letter.height);

        pageData.Page.Entity.forEach(innerElement);

        function innerElement(element, index, array) {
          var locationArray = element._BOX.split(" ");

          function drawLoc(location, size) {
            return location * 200 / size;
          }

          display.cx.fillStyle = '#'+color;
          display.cx.fillRect( 
            drawLoc(locationArray[0], display.letter.width), 
            drawLoc(locationArray[1], display.letter.height), 
            drawLoc(locationArray[2]-locationArray[0], display.letter.width),
            drawLoc(locationArray[3]-locationArray[1], display.letter.height)
          );

          color++;

          if (Array.isArray(element.Block)) {
            console.log(element.Block);
            element.Block.forEach(innerElement);
          }
        };
      }
    }
  });
