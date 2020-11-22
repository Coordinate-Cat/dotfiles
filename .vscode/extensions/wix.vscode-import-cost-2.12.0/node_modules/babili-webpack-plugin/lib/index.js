"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var babel = require("babel-core");
var babiliPreset = require("babel-preset-babili");

var _require = require("webpack-sources"),
    SourceMapSource = _require.SourceMapSource,
    RawSource = _require.RawSource;

module.exports = function () {
  function BabiliPlugin() {
    var babiliOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BabiliPlugin);

    this.babiliOpts = babiliOpts;
    this.options = options;
  }

  _createClass(BabiliPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var babiliOpts = this.babiliOpts,
          options = this.options;


      var jsregex = options.test || /\.js($|\?)/i;
      var commentsRegex = typeof options.comments === "undefined" ? /@preserve|@licen(s|c)e/ : options.comments;

      var useSourceMap = typeof options.sourceMap === "undefined" ? !!compiler.options.devtool : options.sourceMap;

      var _babel = this.options.babel || babel;
      var _babili = this.options.babili || babiliPreset;
      var parserOpts = this.options.parserOpts || {};

      compiler.plugin("compilation", function (compilation) {
        if (useSourceMap) {
          compilation.plugin("build-module", function (module) {
            module.useSourceMap = true;
          });
        }

        compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
          var files = [];

          chunks.forEach(function (chunk) {
            chunk.files.forEach(function (file) {
              return files.push(file);
            });
          });

          compilation.additionalChunkAssets.forEach(function (file) {
            return files.push(file);
          });

          files.filter(function (file) {
            return jsregex.test(file);
          }).forEach(function (file) {
            try {
              var asset = compilation.assets[file];

              if (asset.__babilified) {
                compilation.assets[file] = asset.__babilified;
                return;
              }

              var input = void 0,
                  inputSourceMap = void 0;

              if (useSourceMap) {
                if (asset.sourceAndMap) {
                  var sourceAndMap = asset.sourceAndMap();
                  inputSourceMap = sourceAndMap.map;
                  input = sourceAndMap.source;
                } else {
                  inputSourceMap = asset.map();
                  input = asset.source();
                }
              } else {
                input = asset.source();
              }

              // do the transformation
              var result = _babel.transform(input, {
                parserOpts,
                presets: [[_babili, babiliOpts]],
                sourceMaps: useSourceMap,
                babelrc: false,
                inputSourceMap,
                shouldPrintComment(contents) {
                  return shouldPrintComment(contents, commentsRegex);
                }
              });

              asset.__babilified = compilation.assets[file] = result.map ? new SourceMapSource(result.code, file, result.map, input, inputSourceMap) : new RawSource(result.code);
            } catch (e) {
              compilation.errors.push(e);
            }
          });

          callback();
        });
      });
    }
  }]);

  return BabiliPlugin;
}();

function shouldPrintComment(contents, checker) {
  switch (typeof checker) {
    case "function":
      return checker(contents);
    case "object":
      return checker.test(contents);
    default:
      return !!checker;
  }
}