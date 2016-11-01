(function() {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // HTML Import, Web Component Template
  let link = document.querySelector('link[rel="import"]');
  if (!link.import) {  
    //document.addEventListener('HTMLImportsLoaded', function() {});
    link.addEventListener('load', setupTemplates);
  } else {
    setupTemplates();
  }

  ready(function() {
    new Countdown(20 /* seconds */);
  });

  function setupTemplates() {
    let templates = link.import.querySelectorAll('template');
    for (let i = 0; i < templates.length; i++) {
      document.querySelector('body').appendChild(templates[i]);
    }
  }

  function alertBoxFactory(template, type, className) {
    let alertBox = document.createElement('alert-box');
    alertBox.setAttribute('type', type || 'info');
    if (className) {
      alertBox.classList.add(className);
    }
    let clone = document.importNode(template.content, true);
    alertBox.appendChild(clone);

    return alertBox;
  }


ready(function() {
  // Create Alert Boxes
  let alertBoxes = {};
  let alertBoxTypes = ['info','success','warning','danger','fail'];
  alertBoxTypes.forEach(function (type) {
    alertBoxes[type] = document.getElementById('alert-box-' + type).innerHTML;
  });
  let showAlertBox = function (type) {
    return function () {
      let template = document.createElement('template');
      template.innerHTML = alertBoxes[type];
      let alertBox = alertBoxFactory(template, type);
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
});

  // Map of Countdown instances:seconds
  let _priv = new WeakMap();

  // Countdown model
  let Countdown = function (seconds) {
    _priv.set(this, seconds);

    Object.defineProperty(this, 'seconds', {
      get: function () {
        let _seconds = _priv.get(this);
        return (_seconds >= 60) ? _seconds % 60 : _seconds;
      },
      set: function (s) {
        let _seconds = _priv.get(this);
        if (_seconds === s) { return; }
        _priv.set(this, s);
        this.display();
      }
    });

    Object.defineProperty(this, 'minutes', {
      get: function () {
        let _seconds = _priv.get(this);
        return Math.floor(_seconds / 60);
      }
    });

    this.start();
  };

  Countdown.prototype.start = function () {
    this.display();
    this._ticker = setInterval(function () {
      let s = _priv.get(this);
      if (s > 0) {
        this.seconds = s - 1;
      } else {
        this.stop();
      }
    }.bind(this), 1000);
  };

  Countdown.prototype.stop = function () {
    clearInterval(this._ticker);
  };

  Countdown.prototype.display = function() {
    let minuteEl = document.querySelector('#countdown-warning .minutes');
    let secondsEl = document.querySelector('#countdown-warning .seconds');
    if (!minuteEl || !secondsEl) { return; }
    minuteEl.innerText = this.minutes;
    secondsEl.innerText = this.seconds;

    if (this.seconds === 0 && this.minutes === 0) {
      let evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, false);
      document.getElementById('countdown-warning').dispatchEvent(evt);
      showCountdownInfo();
    }
  };

  function showCountdownInfo() {
    let template = document.getElementById('countdown-info');
    let alertBox = alertBoxFactory(template, 'info', 'fixed');
    document.querySelector('body').appendChild(alertBox);
  }

}());
