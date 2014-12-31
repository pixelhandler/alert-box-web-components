(function () {
  'use strict';

  // HTML Import, Web Component Template
  var link = document.querySelector('link[rel="import"]');
  var templates = link.import.querySelectorAll('template');
  for (var i = 0; i < templates.length; i++) {
    document.querySelector('body').appendChild(templates[i]);
  }

  var alertBoxFactory = function (template, type, className) {
    var alertBox = document.createElement('Alert-Box');
    alertBox.setAttribute('type', type || 'info');
    if (className) {
      alertBox.classList.add(className);
    }
    var clone = document.importNode(template.content, true);
    alertBox.appendChild(clone);

    return alertBox;
  };

  // Create Alert Boxes
  var alertBoxes = {};
  var alertBoxTypes = ['info','success','warning','danger','fail'];
  alertBoxTypes.forEach(function (type) {
    alertBoxes[type] = document.getElementById('alert-box-' + type).innerHTML;
  });
  var showAlertBox = function (type) {
    return function () {
      var template = document.createElement('template');
      template.innerHTML = alertBoxes[type];
      var alertBox = alertBoxFactory(template, type);
      document.querySelector('section').appendChild(alertBox);
    };
  };
  alertBoxTypes.forEach(function (type) {
    document.getElementById('show-' + type + '-alert-box').addEventListener('click', showAlertBox(type));
  });

  // Listen for clicks on alert boxes
  document.addEventListener('alert-box-click', function (evt) {
    if (evt.target.id === 'countdown-warning') {
      console.log('countdown-warning clicked');
    }
    console.log(evt);
  });

  // Map of Countdown instances:seconds
  var _priv = new WeakMap();

  // Countdown model
  var Countdown = function (seconds) {
    _priv.set(this, seconds);
    var notifier = Object.getNotifier(this);

    Object.defineProperty(this, 'seconds', {
      get: function () {
        var _seconds = _priv.get(this);
        return (_seconds >= 60) ? _seconds % 60 : _seconds;
      },
      set: function (s) {
        var _seconds = _priv.get(this);
        if (_seconds === s) { return; }
        notifier.notify({
          type: 'update',
          name: 'seconds',
          oldValue: _seconds
        });
        _priv.set(this, s);
      }
    });

    Object.defineProperty(this, 'minutes', {
      get: function () {
        var _seconds = _priv.get(this);
        return Math.floor(_seconds / 60);
      }
    });

    this.start();
  };

  Countdown.prototype.start = function () {
    Object.observe(this, this._observer);
    this._ticker = setInterval(function () {
      var s = _priv.get(this);
      if (s > 0) {
        this.seconds = s - 1;
      } else {
        this.stop();
      }
    }.bind(this), 1000);
  };

  Countdown.prototype.stop = function () {
    Object.unobserve(this, this._observer);
    clearInterval(this._ticker);
  };

  Countdown.prototype._observer = function(changes) {
    var minuteEl = document.querySelector('#countdown-warning .minutes');
    var secondsEl = document.querySelector('#countdown-warning .seconds');
    if (!minuteEl || !secondsEl) { return; }
    var countdown = changes[0].object;
    minuteEl.innerText = countdown.minutes;
    secondsEl.innerText = countdown.seconds;

    if (countdown.seconds === 0 && countdown.minutes === 0) {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, false);
      document.getElementById('countdown-warning').dispatchEvent(evt);
      showCountdownInfo();
    }
  };

  var showCountdownInfo = function () {
    var template = document.getElementById('countdown-info');
    var alertBox = alertBoxFactory(template, 'info', 'fixed');
    document.querySelector('body').appendChild(alertBox);
  };

  var timer = new Countdown(1 * 60 + 10);

}());
