'use strict';

var _ = require('lodash');
var fs = require('fs');

// Get list of page1s
exports.index = function(req, res) {


// fs.readdir('server/api/page1', function (err, files) {
// 	if (err)
//       console.log("page1 dir error: ",err);
//   	else
//   		console.log('files found in page1:', files);
// });

  res.sendFile('Pg001.xml', {root: 'server/api/page1/'}, function (err) {

    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent: page1 xml');
    }
  });
};