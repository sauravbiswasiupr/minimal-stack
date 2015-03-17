"use strict"; 
 
var qclass = require("qclass");
var Knex = require("knex");

var DbDriver = qclass({
  $construct: function(app) {
    this.app = app; 
    this.connString = app.config.db.url;
    this.knex = Knex.initialize({
      client: "pg",
      connection: this.connString
    });
  }, 
  
  stop: function(cb) {
    this.knex.client.pool.destroy(cb);
  }
});

/*
 * @module db
 */
module.exports = {
  name: "db", 
  deps: [], 
  
  start: function(app, next) {
    app.db = new DbDriver(app);
    next(null);
  }, 
  
  stop: function(app, next) {
    app.db.stop(next);
  }
}