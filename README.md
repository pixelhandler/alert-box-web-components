# Alert Box

Web Component for an "Alert Box" element. (Requires: HTML Imports,
HTML Templates, Custom Elements, and Shadow DOM)


## Import

    <link rel="import" href="http://pixelhandler.github.io/alert-box-web-components/index.html">

Well don't really use that URL, but that is a copy of the dist file, instead install...


## Install

    npm install alert-box-web-components


## Demo

* <http://pixelhandler.github.io/alert-box-web-components/example/>


## Development

The example directory shows a few alerts and one using Object.observe
for data bindings.

* `bower install`
* `npm install`
* `npm run start` launches broccoli (development) server
* `npm run open` opens location <http://localhost:4200/example/>

Click `X` icons to dismiss alert box, click buttons to render more.

The alert box on the lower right is an example of an alert box with
a countdown. Hours and seconds tick down, then closes and a new alert
follows.


### Build

Brocfile.js (broccoli) is the build recipe, `npm run build` will create
dist/index.html and dist/example/ only the index.html file is released with
bower and npm packages. To watch and build use `npm run start` then open
links under the heading below. Use ctrl-C to stop.


## Reference

*W3.org Specs*

* [Web Components Current Status](http://www.w3.org/standards/techs/components#w3c_all)
* [HTML Templates](http://www.w3.org/TR/html-templates/)
* [Custom Elements](http://www.w3.org/TR/custom-elements/)
* [Shadow DOM](http://www.w3.org/TR/shadow-dom/)
* [HTML Imports](http://www.w3.org/TR/html-imports/)

*Tutorials / Links*

* [WebComponents.org](http://webcomponents.org)
* [Custom Elements - A Web Components Gallery for Modern Web Apps](http://customelements.io)
* [Custom Elements: defining new elements in HTML - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
* [Introduction to Shadow DOM — WebComponents.org](http://webcomponents.org/articles/introduction-to-shadow-dom/)
* [Shadow DOM 101 - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
* [Shadow DOM 201: CSS and Styling - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301: Advanced Concepts & DOM APIs - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)
* [getter - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
* [YOU MIGHT NOT NEED JQUERY](http://youmightnotneedjquery.com/)
