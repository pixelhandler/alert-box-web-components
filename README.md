# Alert Box

Web Component for an "Alert Box" element. (Chrome only, which supports 
HTML Imports, HTML Templates, Custom Elements, and Shadow DOM)


## Import

    <link rel="import" href="http://pixelhandler.github.io/alert-box-web-components/index.html">

Well don't really use that URL, but that is a copy of the dist file, instead install...


## Install

	bower install alert-box-web-components

or

	npm install alert-box-web-components


## Demo

* Web Component only: <http://pixelhandler.github.io/alert-box-web-components/example/>
* Ember.js app using (native) Web Component: <http://pixelhandler.github.io/alert-box-web-components/example/app.html>
* As an Ember.Component only: <http://pixelhandler.github.io/alert-box-web-components/example/ember-component.html>


## Development

The example directory shows a few alerts and one using Object.observe
for data bindings.

* `bower install`
* `npm install`
* `npm run server` launches broccoli (development) server
* `npm run open` opens location <http://localhost:4200/example/>

Click `X` icons to dismiss alert box, click buttons to render more.

The alert box on the lower right is an example of an alert box with
a countdown. Hours and seconds tick down, then closes and a new alert
follows.


### Using with Ember.js

Compare various examples of Web Components and/or Ember.Components.

Start the development server with `npm run server` and visit...

* Web Component only: <http://localhost:4200/example/index.html>
* Ember.js app using (native) Web Component: <http://localhost:4200/example/app.html>
* As an Ember.Component only: <http://localhost:4200/example/ember-component.html>


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
* [A Guide to Web Components](http://css-tricks.com/modular-future-web-components/)
* [Data-binding Revolutions with Object.observe() - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es7/observe/)
* [getter - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
* [Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom)
* [YOU MIGHT NOT NEED JQUERY](http://youmightnotneedjquery.com/)
* [Ember.Component](http://emberjs.com/api/classes/Ember.Component.html)
