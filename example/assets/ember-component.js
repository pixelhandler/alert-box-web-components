(function(){

var App = Ember.Application.create();

App.Router.map(function() {});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return App.CountdownModel.create({
      totalSeconds: 15
    });
  },

  afterModel: function (model) {
    model.start();
  },

  actions: {
    showAlertBox: function(templateName) {
      this.renderAlert(templateName);
    },

    dismissAlert: function(name) {
      if (name === 'countdown-warning') {
        this.get('countdown').stop();
      }
    }
  },

  renderAlert: function(templateName) {
    this.render(templateName, {
      into: 'application',
      outlet: 'alerts',
      controller: this.controllerFor('application')
    });
  },

  countdown: function() {
    return this.modelFor('application');
  }.property()
});

App.AlertBoxComponent = Ember.Component.extend({
  tagName: 'alert-box',
  classNames: ['alert-box'],
  classNameBindings: ['hasCloseContent:has-close-content'],
  attributeBindings: ['type'],

  type: 'info',

  iconTemplateName: function() {
    return 'icon-' + this.get('type');
  }.property('type'),

  closeTemplateName: 'icon-x',

  closeContent: '',
  hasCloseContent: Ember.computed.notEmpty('closeContent'),

  click: function (evt) {
    if (this.get('action') && this.get('param')) {
      this.sendAction('action', this.get('param'));
    }
    this.destroy();

    return false;
  }
});

App.CountdownAlertBoxComponent = App.AlertBoxComponent.extend({
  param: null, // don't use a param use template name properties below instead...
  infoTemplateName: '',
  warningTemplateName: '',

  ticker: null,
  warningCount: 10,

  countdown: function () {
    var count = this.get('ticker');
    if (count === 0) {
      this.sendAction('action', this.get('infoTemplateName'));
      this.destroy();
    } else if (count === this.get('warningCount')) {
      this.sendAction('action', this.get('warningTemplateName'));
    }
  }.observes('ticker').on('init')
});

App.CountdownModel = Ember.Object.extend({
  totalSeconds: null,
  ticker: Ember.computed.readOnly('totalSeconds'),

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

}());
