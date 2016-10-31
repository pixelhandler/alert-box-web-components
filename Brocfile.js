let fs = require('fs');
let path = require('path');
let concat = require('broccoli-concat');
let Funnel = require('broccoli-funnel');
let mergeTrees = require('broccoli-merge-trees');

let components = concat('lib', {

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

let example = new Funnel('example', {
  srcDir: '/',
  destDir: 'example'
});

let exampleDependencies = concat('node_modules', {
  inputFiles: [
    'webcomponents.js/webcomponents.js'
  ],
  outputFile: '/example/assets/vendor.js',
  wrapInFunction: false,
});

module.exports = mergeTrees([components, example, exampleDependencies]);
