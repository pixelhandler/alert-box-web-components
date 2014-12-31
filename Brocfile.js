var fs = require('fs');
var path = require('path');
var concat = require('broccoli-concat');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var components = concat('lib', {

  inputFiles: [
    'alert-box.html',
    'icon-info.html',
    'icon-x.html',
    'icon-danger.html',
    'icon-warning.html',
    'icon-success.html',
    'icon-fail.html'
  ],

  outputFile: '/index.html',

  wrapInFunction: false,

  header: [
    '<!-- BEGIN AlertBox Web Components',
    'See: https://github.com/pixelhandler/alert-box',
    fs.readFileSync(path.resolve(__dirname, 'LICENSE.txt'), 'utf8'),
    '-->'
	].join('\n\n'),

  footer: '<!-- END AlertBox Web Components -->'
});

var example = pickFiles('example', {
  srcDir: '/',
  destDir: 'example'
});

var exampleDependencies = concat('bower_components', {
  inputFiles: [
    'jquery/dist/jquery.min.js',
    'handlebars/handlebars.min.js',
    'ember/ember.min.js'
  ],
  outputFile: '/example/assets/vendor.js',
  wrapInFunction: false,
});

module.exports = mergeTrees([components, example, exampleDependencies]);