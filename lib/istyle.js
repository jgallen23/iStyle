var stylus = require("stylus"),
    fs = require("fs"),
    path = require("path");

var iStyle = function(colorFile) {
  this.colorFile = colorFile || path.join(__dirname, "../src/iphone");
  this.compress = true;
};

iStyle.prototype.generate = function(callback) {
  var self = this;
  file = path.join(__dirname, "../src/istyle.styl");
  fs.readFile(file, "utf8", function(err, data) {
    stylus(data)
      .set("filename", file)
      .set("compress", self.compress)
      .import(self.colorFile)
      .render(function(err, css) {
        if (callback) callback(css);
      });
  });
};

iStyle.prototype.generateFile = function(outFile, callback) {
  this.generate(function(css) {
    fs.writeFile(outFile, css, function() {
      if (callback) callback();
    });
  });
};

if (module.parent) {
  module.exports = iStyle;
} else {
  is = new iStyle(path.join(__dirname, "../src/iphone-green"));
  is.generateFile("istyle.css");
}


