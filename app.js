"use strict"; 

var qapp = require("qapp");
var util = require("util");

var server = require("./server");
var db = require("./db");

var ConsoleLogger = {
  log: function(level, msg) {
    var s = "[" + level + "]" + 
      util.format.apply(null, Array.prototype.slice.call(arguments, 1));
    console.log(s);
  }
}; 

/*
 * call the app inside an anonymous function
 */

(function(argv) {
  var app = qapp({
    logger: ConsoleLogger, 
    config: {
      http: 3000, 
      db: {
        url: "pg://saurav@localhost:5432/test"
      }
    }
  }); 
  
  app.register([server, db]);
  
  app.start(["server", "db"], function(err) {
    if (err)
      app.logger.log("error", "Error occurred: %s", err.message);
    else
      app.logger.log("silly", "App started gracefully");
  });
})(process.argv);