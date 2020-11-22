"use strict";

var fs = require("fs");
var parseString = require("xml2js").parseString;

var parse = {};

var classDetailsFromProjects = function (projects) {
    var classDetails = [];
    var packageName = null;

    var parseFile = function (fileObj, packageName) {
        if (fileObj.hasOwnProperty("class")) {
            fileObj["class"].forEach(function(classObj) {
                classDetails = classDetails.concat({ name: classObj.$.name, metrics: classObj.metrics[0], fileName: fileObj.$.name, fileMetrics: fileObj.metrics[0], lines: fileObj.line, packageName: packageName });
            });
        } else {
            classDetails = classDetails.concat({ name: null, metrics: null, fileName: fileObj.$.name, fileMetrics: fileObj.metrics[0], lines: fileObj.line, packageName: packageName });
        }
    }

    projects.forEach(function (projectObj) {
        if (projectObj.hasOwnProperty("package")) {
            projectObj.package.forEach(function (data) {
                if (data.hasOwnProperty("$") && data.$.hasOwnProperty("name")) {
                    packageName = data.$.name;
                } else {
                    packageName = null;
                }
                data.file.forEach(parseFile);
            });
        }
        if (projectObj.hasOwnProperty("file")) {
            packageName = null;
            projectObj.file.forEach(parseFile);
        }
    });
    return classDetails;
};

var unpackage = function (projects) {
    var classDetails = classDetailsFromProjects(projects);

    return classDetails.map(function (c) {
        var methodStats = [],
            lineStats = [];

        if(c.lines !== undefined) {
            c.lines.forEach(function (l) {
                if (l.$.type === "method") {
                    methodStats.push({
                        name: l.$.name,
                        line: Number(l.$.num),
                        hit: Number(l.$.count)
                    });
                }
            });
            c.lines.forEach(function (l) {
                if (l.$.type !== "method") {
                    lineStats.push({
                        line: Number(l.$.num),
                        hit: Number(l.$.count)
                    });
                }
            });
        }

        var classCov = {
            title: c.name,
            file: c.fileName,
            functions: {
                found: methodStats.length,
                hit: 0,
                details: methodStats
            },
            lines: {
                found: lineStats.length,
                hit: 0,
                details: lineStats
            }
        };

        classCov.functions.hit = classCov.functions.details.reduce(function (acc, val) {
            return acc + (val.hit > 0 ? 1 : 0);
        }, 0);

        classCov.lines.hit = classCov.lines.details.reduce(function (acc, val) {
            return acc + (val.hit > 0 ? 1 : 0);
        }, 0);

        return classCov;
    });
};

parse.parseContent = function (xml) {
    return new Promise(function (resolve, reject) {
        parseString(xml, function (err, parseResult) {
            if (err) {
                reject(err);
            }
            var result = unpackage(parseResult.coverage.project);
            resolve(result);
        });
    });
};

parse.parseFile = function(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, "utf8", function (err, content) {
            if (err) {
                reject(err);
            }

            parse.parseContent(content).then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        });
    });
};

module.exports = parse;
