var express = require("express");
var app = express.createServer();
var path = require("path");
var fs = require("fs");

var port = 3005;

app.configure(function() {
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);

	app.set("views", __dirname+"/templates");


	var stylusCompile = function(str, path) {
		console.log(arguments);
		return stylus(str).set('filename', path).set('compress', true);
	};

	var stylus = require("stylus");
	app.use(stylus.middleware({
		src: path.join(__dirname, "../src"),
		dest: __dirname + '/public',
		compile: stylusCompile
	}));


	app.use(express.static(__dirname+"/public"));

	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.get("/", function(req, res) { 

	locals = { 
	};

	res.render("index.jade", { layout: false, locals: locals });
});

app.listen(port, "0.0.0.0");
console.log("Server started on port " + port);
