const express = require('express');
const path    = require('path');

global.log   = require('./log');
const db     = require('./db');
const api    = require("./api");

const app = express();

module.exports = (params) => {
  initialize(params);
};

initialize = function(params) {
  
  /* Main Application Server - (Keep It Functional, Non-Global State) */

  /* Logger */
  log.init();
  log.open(`${process.cwd()}/app.log`);
  log.consoleOut = true;
  log.setLogLevel(params.application.logLevel);
  log.write(`${params.application.alias} Application Initializing`, 0);

  /* Initialize Database - MongoDB */
  db.initialize(params.db);

  /* Initialize HTTP API */
  api.initialize(params.api);
  
  /* Static Application Web Server */
  app.use(express.static(path.join(process.cwd(), '/public')));

  app.get('*', (req, res) => {
    res.redirect('/');
  });

  app.listen(params.application.server.port);
  log.write(`${params.application.alias} Application Web Server Listening At: ${params.application.server.port}`, -1);
};