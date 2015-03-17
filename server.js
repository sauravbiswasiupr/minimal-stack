"use strict";

var qclass = require("qclass");
var express = require("express");

var Server = qclass({
  $construct: function(app) {
    this.app = app;   
    var web = express();
    web.use(express.bodyParser());
    web.use(express.json());
    web.use(express.urlencoded());
    this.app.web = web; 
  }, 
    
  start: function(cb) {
    var logger = this.app.logger; 
    this.app.web.listen(this.app.config.http, function() {
      logger.log("silly", "[WEBSERVER] Started successfully");
    });
    cb(null);
  },
    
  stop: function(cb) {
    cb(null);
  }
});

/*
 * @module server
 */

module.exports = {
  name: "server", 
  deps: [], 
  
  start: function(app, next) {
    app.server = new Server(app);
    app.server.start(next);
  }, 
  
  stop: function(app, next) {
    app.server.stop(next);
  }
};