'use strict';

angular.module('newsletterApp')
  .factory('NewsletterBuilder', function ($window) {
    return function (canvasElement, pageData) {

      var canvas = canvasElement[0];
      canvas.width = $window.innerWidth;
      canvas.height = $window.innerHeight;
      var cx = canvas.getContext('2d');

      var letter = {
        height: pageData.Page._HEIGHT,
        width: pageData.Page._WIDTH,
        scale: 1,
        image: new Image()
      };

      letter.image.src = '/assets/images/Pg001.png';
      letter.image.onload = function() {
        console.log('image loaded');
        letterRenderer();
      };

      var view = {
        x: findCenter('width', letter.width),
        y: findCenter('height', letter.height),
        width: canvas.width,
        height: canvas.height,

        move: false,
        select: null
      };

      var articleSections = {};

      pageData.Page.Entity.forEach(createSection);

      //adds each article section to array to avoid extra calculations
      function createSection(element) {
        var currentLocationArray = element._BOX.split(' ');

        var xscale = 8.5,
            yscale = 14.3;

        function finderLoc(location, size, scale) {
          return location * 100 / size * scale;
        }

      
        articleSections[element._ID] = {
          name: element.Name,
          id: element._ID,
          loc: {
            x: finderLoc(currentLocationArray[0], letter.width, xscale),
            y: finderLoc(currentLocationArray[1], letter.height, yscale),
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


      function findCenter(measurementDirection, measurementLength) {
        return canvas[measurementDirection] /2 - ( measurementLength * letter.scale / 2 );
      }


      //public methods
      this.articleSections = articleSections;
      this.canvasResize = canvasResize;
      this.centerOnArticle = centerOnArticle;
      this.letterMove = letterMove;
      this.letterRenderer = letterRenderer;
      this.scaleToFit = scaleToFit;
      this.selected = function() {return view.select;};
      this.zoomOut = zoomOut;

      function canvasResize(windowWidth, windowHeight) {
        view.width = cx.canvas.width = canvas.width = windowWidth;
        view.height = cx.canvas.height = canvas.height = windowHeight;

        letterRenderer();
      }

      function centerOnArticle(artId) {
        view.select = articleSections[artId];

        var scale = canvas.width/view.select.loc.width;

        if (scale < 1) {
          letter.scale = scale;
        } else {
          letter.scale = 1;
        }

        view.x = canvas.width /2 - (view.select.loc.x + view.select.loc.width/2)*letter.scale;
        view.y = canvas.height /2 - (view.select.loc.y + view.select.loc.height/2)*letter.scale;

        console.log(view.x, view.y);
        letterRenderer()
      }

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
          }

          //find relative position of mouse on canvas
          function relativePos(event, element) {
            var rect = element.getBoundingClientRect();
            return {
              x: Math.floor(event.clientX - rect.left),
              y: Math.floor(event.clientY - rect.top)
            };
          }

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
      }

      //var color = 100;//this is outside the letterRender function to make it looks really cool while rerendering 
      function letterRenderer() {

        //clear canvas
        cx.clearRect(0, 0, canvas.width, canvas.height);

        cx.drawImage(
          letter.image, 
          view.x, 
          view.y, 
          letter.width * letter.scale, 
          letter.height * letter.scale
        );

        if (view.select) {
          cx.fillStyle = 'RGBa(255, 255, 0, 0.3)';
          cx.fillRect(view.select.loc.x * letter.scale + view.x,
          view.select.loc.y * letter.scale + view.y, 
          view.select.loc.width * letter.scale, 
          view.select.loc.height * letter.scale);
        }

        // for(var key in articleSections) {
        //   var element = articleSections[key];

        //   cx.fillStyle = '#'+color;
        //   cx.fillRect( 
        //     (element.loc.x*letter.scale+view.x), 
        //     (element.loc.y*letter.scale+view.y), 
        //     (element.loc.width*letter.scale),
        //     (element.loc.height*letter.scale)
        //   );

        //   //this will make all kind of crazy colors while rerendering. No real reason for it.
        //   if (color < 1000)
        //     color++;
        //   else
        //     color=100;
        //   }
      }

      function scaleToFit (width, height) {
        if (height > canvas.height) {
          letter.scale = canvas.height/height;
        }
      }

      function zoomOut () {
        scaleToFit(letter.width, letter.height);

        view.x = findCenter('width', letter.width);
        view.y = findCenter('height', letter.height);

        view.select = null;

        letterRenderer();
      }
    };
  });
