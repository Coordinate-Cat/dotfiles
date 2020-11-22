'use strict';

// Replace promise and Object.assign
var Promise = require('bluebird');
var assign = require('lodash.assign');

// Lazy load node modules
var fs;
var mime;
var imageSize;
var gzipSize;
var moment;

var DECIMAL_BASE = 1000;

var IEC_BASE = 1024;

var FORMAT_24_HOUR = 'HH:mm:ss';

var FORMAT_12_HOUR = 'h:mm:ss a';

var IEC_SUFIXES = [
  'bytes',
  'KiB',
  'MiB',
  'GiB',
  'TiB',
  'PiB',
  'EiB',
  'ZiB',
  'YiB'
];

var DECIMAL_SUFIXES = [
  'bytes',
  'kB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB'
];

var IMAGE_FORMATS = [
  'image/bmp',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/tiff',
  'image/x-tiff',
  'image/webp',
  'image/vnd.adobe.photoshop'
];

// Support cancelable info requests
Promise.config({ cancellation: true });

function extractInfo(filepath, stats) {
  return {
    absolutePath: filepath,
    size: stats.size,
    dateCreated: stats.birthtime.toISOString(),
    dateChanged: stats.mtime.toISOString()
  };
}

function loadFileInfoAsync(filepath) {
  fs = fs || require('fs');
  return new Promise(function getFileAsync(resolve, reject) {
    if (filepath) {
      fs.stat(filepath, function getFileStatsAsync(err, stats) {
        var info;
        if (!err) {
          info = extractInfo(filepath, stats);
          resolve(info);
        } else {
          reject(err);
        }
      });
    } else {
      reject(new Error('Please provide a valid filepath'));
    }
  });
}

function loadFileInfoSync(filepath) {
  var stats;
  fs = fs || require('fs');
  try {
    stats = fs.statSync(filepath);
  } catch (e) {
    throw Error('Please provide a valid filepath');
  }
  return extractInfo(filepath, stats);
}

function getPrettySize(size, base, suffixes) {
  var scale = Math.floor(Math.log(size) / Math.log(base));
  var activeSuffix = suffixes[scale];
  var scaledSize = size / Math.pow(base, scale);
  // Round size with a decimal precision of 2
  var fixedScale = Math.round(scaledSize + 'e+2');
  var roundedSize = Number(fixedScale + 'e-2');
  return roundedSize + ' ' + activeSuffix;
}

function addPrettySize(info, options) {
  var base;
  var suffixes;
  var useDecimal = options.useDecimal;
  var size = info.size;
  if (size === 0) return assign(info, { prettySize: '0 bytes' });
  if (size === 1) return assign(info, { prettySize: '1 byte' });
  base = (useDecimal) ? DECIMAL_BASE : IEC_BASE;
  suffixes = (useDecimal) ? DECIMAL_SUFIXES : IEC_SUFIXES;
  return assign(info, { prettySize: getPrettySize(size, base, suffixes) });
}

function addMimeTypeInfo(info) {
  mime = mime || require('mime');
  return assign(info, { mimeType: mime.getType(info.absolutePath) });
}

function addImageInfo(info) {
  if (!info.mimeType || !IMAGE_FORMATS.includes(info.mimeType)) return info;
  imageSize = imageSize || require('image-size');
  return assign(info, { dimmensions: imageSize(info.absolutePath) });
}

function addPrettyDateInfo(info, options) {
  var use24HourFormat = options.use24HourFormat;
  var hourFormat = (use24HourFormat) ? FORMAT_24_HOUR : FORMAT_12_HOUR;
  moment = moment || require('moment');
  return assign(info, {
    prettyDateCreated: moment(info.dateCreated).format('MMMM Do YYYY, ' + hourFormat),
    prettyDateChanged: moment(info.dateChanged).format('MMMM Do YYYY, ' + hourFormat)
  });
}

function addGzipSize(info, options) {
  var size;
  var useDecimal = options.useDecimal;
  var base = (useDecimal) ? DECIMAL_BASE : IEC_BASE;
  var suffixes = (useDecimal) ? DECIMAL_SUFIXES : IEC_SUFIXES;
  gzipSize = gzipSize || require('gzip-size');
  size = gzipSize.sync(fs.readFileSync(info.absolutePath));
  return assign(info, { gzipSize: getPrettySize(size, base, suffixes) });
}

module.exports = {
  loadFileInfoSync: loadFileInfoSync,
  loadFileInfoAsync: loadFileInfoAsync,
  addPrettySize: addPrettySize,
  addMimeTypeInfo: addMimeTypeInfo,
  addImageInfo: addImageInfo,
  addPrettyDateInfo: addPrettyDateInfo,
  addGzipSize: addGzipSize
};
