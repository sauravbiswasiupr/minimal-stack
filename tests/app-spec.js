"use strict";

var http = require("http");
var qapp = require("qapp"); 

var server = require("../server");
var db = require("../db");

var ConsoleLogger = {
  log: function(level, msg) {
    var s = "[" + level + "]" + 
      util.format.apply(null, Array.prototype.slice.call(arguments, 1));
    console.log(s);
  }
}; 

/*
 * Mock the app that we need to run
 * as entry point of our application
 */

describe("App functionality", function() {
  it("should test app starting", function() {
    var app = null;
    runs(function() {
      app = qapp({
        config: {
          http: 3000,      
          db: {
            url: "pg://saurav@localhost:5432/test"
          }
        }
      });
      
      app.register([server, db]);
      app.start(["server", "db"], function(err) {
        expect(err).toBeNull();
      });      
    });
    
    waitsFor(function() {
      return app.isRunning();
    });
    
    runs(function() {
      app.stop(function() {        
      });
    });
    
    waitsFor(function() {
      return app.isStopped();
    });
  });
});