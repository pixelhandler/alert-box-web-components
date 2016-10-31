var fs = require('fs');
var path = require('path');
var concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
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

var example = new Funnel('example', {
  srcDir: '/',
  destDir: 'example'
});

module.exports = mergeTrees([components, example]);
