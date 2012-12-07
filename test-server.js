'use strict';

// process.argv[2] will be 'debug' or 'prod'

var express = require('express'),
    server = express(),
    fs = require('fs'),
    path = require('path');

server.configure(function() {
  server.use(express.logger('dev'));
  // 'static' is a reserved word so dot notation is not used to
  // avoid annoying the linter.
  server.use(express['static'](__dirname));
  // fallback to looking in assets
  server.use('/juju-ui', express['static'](
    __dirname + '/build-' + process.argv[2] + '/juju-ui'));
  server.use(express.bodyParser());
  server.use(express.methodOverride());
});

server.get('/juju-ui/:file', function(req, res) {
  var fileName = req.params.file;
  res.sendfile('build-' + process.argv[2] + '/juju-ui/' + fileName);
});

var port = 8084;

server.listen(port, function() {
  console.log(process.argv[2] + ' server listening on ' + port);
});
