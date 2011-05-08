var express = require("express");
var app = express.createServer();
var path = require("path");
var fs = require("fs");
var stylus = require("stylus");
var iStyle = require("../lib/istyle");

var port = 3005;

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);

  app.set("views", __dirname+"/templates");

  app.use(express.static(__dirname+"/public"));

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.get("/", function(req, res) { 
  color = req.query.color || "iphone";
  locals = { 
  };

  res.render("index.jade", { color: color, layout: false, locals: locals });
});

app.get("/istyle.css", function(req, res) {
  color = req.query.color;
  istyle = new iStyle(color);
  istyle.compress = false;

  istyle.generate(function(css) {
    res.contentType("text/css");
    res.send(css);
  });

});

app.listen(port, "0.0.0.0");
console.log("Server started on port " + port);
