# clover-json

Parse [clover](https://www.atlassian.com/software/clover) report files, and return a JSON representation in a [lcov-parse](https://github.com/davglass/lcov-parse) compatible manner.

## Installation

```bash
$ npm i @cvrg-report/clover-json --save
```

## Usage

```javascript
var clover = require("@cvrg-report/clover-json");

// Parse by file path
clover.parseFile("filepath.xml")
    .then(function (result) {
        console.log(JSON.stringify(result));
    }).catch(function (err) {
        console.error(err);
    });

// Parse by file contents
clover.parseContent("<?xml version=\"1.0\" ?><coverage>...</coverage>")
    .then(function (result) {
        console.log(JSON.stringify(result));
    }).catch(function (err) {
        console.error(err);
    });
```
