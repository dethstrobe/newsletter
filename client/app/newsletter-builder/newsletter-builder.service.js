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
        scale: 1,
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

      var articleSections = {};

      pageData.Page.Entity.forEach(createSection);

      //adds each article section to array to avoid extra calculations
      function createSection(element) {
        var currentLocationArray = element._BOX.split(" ");

        var xscale = 8.5,
            yscale = 14.3;

        function finderLoc(location, size, scale) {
          return location * 100 / size * scale;
        }

      

        articleSections[element._ID] = {
          name: element.Name,
          loc: {
            x: finderLoc(currentLocationArray[0], letter.width, xscale),
            y: finderLoc(currentLocationArray[1], letter.width, yscale),
            width: finderLoc(currentLocationArray[2]-currentLocationArray[0], letter.width, xscale),
            height: finderLoc(currentLocationArray[3]-currentLocationArray[1], letter.height, yscale)
          }
        };

        if (Array.isArray(element.Block)) {
          element.Block.forEach(createSection);
        } else if (element.Block) {
          createSection(element.Block);
        }
      };

      console.log(articleSections);


      //public methods
      this.canvasResize = canvasResize;
      this.letterMove = letterMove;
      this.letterRenderer = letterRenderer;

      function canvasResize(windowWidth, windowHeight) {
        view.width = cx.canvas.width = canvas.width = windowWidth;
        view.height = cx.canvas.height = canvas.height = windowHeight;

        letterRenderer();
      };

      function letterMove(event) {

        if (event.which == 1) {

          //do onMove function on mousemove
          function trackDrag(onMove) {
            function end(event) {
              removeEventListener("mousemove", onMove);
              removeEventListener("mouseup", end);
            }
            addEventListener("mousemove", onMove);
            addEventListener("mouseup", end);
          };

          //find relative position of mouse on canvas
          function relativePos(event, element) {
            var rect = element.getBoundingClientRect();
            return {
              x: Math.floor(event.clientX - rect.left),
              y: Math.floor(event.clientY - rect.top)
            };
          };

          var canvas = event.currentTarget;
          var pos = relativePos(event, canvas);

          trackDrag(function(event) {
            var newPos = relativePos(event, canvas);

            view.x += newPos.x-pos.x;
            view.y += newPos.y-pos.y;
            letterRenderer();

            view.move = true;
            pos = newPos;
          });


          event.preventDefault();
        }
      };

      var color = 100;//this is outside the letterRender function to make it looks really cool while rerendering 
      function letterRenderer() {

        //clear canvas
        cx.clearRect(0, 0, canvas.width, canvas.height);

        cx.drawImage(letter.image, view.x, view.y);

        pageData.Page.Entity.forEach(innerElement);

        function innerElement(element, index, array) {
          var locationArray = element._BOX.split(" ");

          function drawLoc(location, size, scale) {
            return location * 100 / size * scale;
          }

          var xscale = 8.5,
              yscale = 14.3;

          cx.fillStyle = '#'+color;
          cx.fillRect( 
            drawLoc(locationArray[0], letter.width, xscale)+view.x, 
            drawLoc(locationArray[1], letter.height, yscale)+view.y, 
            drawLoc(locationArray[2]-locationArray[0], letter.width, xscale),
            drawLoc(locationArray[3]-locationArray[1], letter.height, yscale)
          );

          //this will make all kind of crazy colors while rerendering. No real reason for it.
          if (color < 1000)
            color++;
          else
            color=100;

          if (Array.isArray(element.Block)) {
            element.Block.forEach(innerElement);
          } else if (element.Block) {
            innerElement(element.Block);
          }
        };



      }
    }
  });
