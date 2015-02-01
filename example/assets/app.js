(function () {
  'use strict';

  window.EmberENV = {
    // https://github.com/emberjs/ember.js/blob/master/FEATURES.md
    FEATURES: {
      'ember-htmlbars-component-generation': true
    }
  };

  Ember.Application.initializer({
    name: 'init-web-components',

    initialize: function() {
      // HTML Import, Web Component Template
      var link = document.querySelector('link[rel="import"]');
      var templates = link.import.querySelectorAll('template');
      for (var i = 0; i < templates.length; i++) {
        document.querySelector('body').appendChild(templates[i]);
      }
    }
  });

  var App = Ember.Application.create({
    rootElement: '#app',
    customEvents: { 'alert-box-click': 'alertBoxClick' },
    LOG_RESOLVER: true
  });

  // Countdown model
  App.CountdownModel = Ember.Object.extend({
    totalSeconds: null,

    seconds: function(key, value, previousValue) {
      // setter
      if (arguments.length > 1) {
        if (this.get('totalSeconds') !== value) {
          this.set('totalSeconds', value);
        }
      }
      // getter
      var _seconds = this.get('totalSeconds');
      return (_seconds >= 60) ? _seconds % 60 : _seconds;
    }.property('totalSeconds'),

    minutes: function () {
      var _seconds = this.get('totalSeconds');
      return Math.floor(_seconds / 60);
    }.property('totalSeconds'),

    start: function () {
      this._ticker = setInterval(function () {
        var _seconds = this.get('totalSeconds');
        if (_seconds > 0) {
          this.set('totalSeconds', _seconds - 1);
        } else {
          this.stop();
        }
      }.bind(this), 1000);
    },

    stop: function () {
      clearInterval(this._ticker);
    }
  });

  App.Router.map(function() {});

  App.ApplicationRoute = Ember.Route.extend({
    model: function () {
      return App.CountdownModel.create({
        totalSeconds: 1 * 60 + 10
      });
    },
    afterModel: function (model) {
      model.start();
    },
    actions: {
      showAlertBox: function(options) {
        this.render(options.templateName, {
          into: 'application',
          outlet: 'alerts',
          controller: this.controllerFor('application')
        });
      },
      reset: function (newCount) {
        this.modelFor('application').set('totalSeconds', newCount);
      },
      error: function(err) {
        Ember.$('#errors').append('<pre>' + err.message + '<pre><br>');
      }
    }
  });

  App.ApplicationController = Ember.ObjectController.extend({
    newCount: 10
  });

  App.ApplicationView = Ember.View.extend({
    alertBoxClick: function (evt) {
      if (evt.target.dataset.hasOwnProperty('minutes') && evt.target.dataset.hasOwnProperty('seconds')) {
        if (evt.target.dataset.minutes === "0" && evt.target.dataset.minutes === "0") {
          Ember.run.next(function() {
            this.get('context.target').send('showAlertBox', {templateName: 'countdown-info-alert-box'});
          }.bind(this));
        } else {
          this.get('controller.model').stop();
        }
      }
    },

    countdownDone: function () {
      var _seconds = this.get('controller.model.totalSeconds');
      if (_seconds === 0) {
        this.$('alert-box.fixed').trigger('click');
      }
    }.observes('controller.model.totalSeconds')
  });

  App.IndexRoute = Ember.Route.extend({
    model: function() {
      var alertBoxes = "info success warning danger fail".w();
      var factory = this.addModel.bind(this);
      return alertBoxes.map(function (type) {
        return factory(type);
      });
    },

    addModel: function (type) {
      return { templateName: "alert-box-%@".fmt(type) };
    },

    renderTemplate: function (controller, model) {
      this.render('index', {
        controller: controller
      });

      this.render('countdown-warning-alert-box', {
        into: 'application',
        outlet: 'alerts',
        controller: this.controllerFor('application')
      });
    },

    actions: {
      showAlertBox: function(type) {
        if (typeof type !== 'string') { return true; }
        this.modelFor('index').pushObject(this.addModel(type));
      },
      error: function(err) {
        Ember.$('#errors').append('<pre>' + err.message + '<pre><br>');
      }
    }
  });

  // AlertBoxComponents and components that extend it upgrade
  // a native Web Component `<alert-box>`

  // NOTE: without alert-box being defined in ember...
  // The feature for `ember-htmlbars-component-generation: true`
  // would bug out on `<alert-box>` used in a template
  App.AlertBoxComponent = Ember.Component.extend({
    tagName: 'alert-box',
    attributeBindings: ['type'],
    type: 'info'
  });

  App.CountdownWarningComponent = App.AlertBoxComponent.extend({
    classNames: ['fixed'],
    attributeBindings: ['minutes:data-minutes', 'seconds:data-seconds'],
    layoutName: 'countdown-warning',
    type: 'warning',
    minutes: 0,
    seconds: 0
  });

  App.CountdownInfoComponent = App.AlertBoxComponent.extend({
    classNames: ['fixed'],
    layoutName: 'countdown-info'
  });

}());
