;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Foursquare;

  Foursquare = function(options) {
    return new Foursquare.Client(options);
  };

  Foursquare.Client = require('./foursquare/client');

  Foursquare.utilities = require('./foursquare/utilities');

  if (typeof window !== 'undefined') {
    window.Foursquare = Foursquare;
  }

  module.exports = Foursquare;

}).call(this);

},{"./foursquare/client":4,"./foursquare/utilities":6}],2:[function(require,module,exports){
(function() {
  var Authentication, Timeout, authentication_window;

  authentication_window = false;

  Timeout = 30000;

  Authentication = (function() {
    function Authentication(_arg) {
      var access_token, authentication_began_at, hash_params;
      this.client = _arg.client, this.timeout = _arg.timeout;
      access_token = this.client.utilities.hash_params().access_token;
      if (access_token) {
        this.client.access_token = access_token;
      } else {
        if (authentication_window && +(new Date) - auth_began > auth_timeout) {

        } else if (authentication_window && authentication_window instanceof Window) {
          hash_params = this.client.utilities.parse_hash_params(authentication_window);
          authentication_window.close();
        } else {
          authentication_window = window.open(this.url());
          authentication_began_at = +(new Date);
          setTimeout(arguments.callee(), 100);
        }
      }
    }

    Authentication.prototype.url = function() {
      return "https://foursquare.com/oauth2/authenticate?client_id=" + this.client.client_id + "&response_type=token&redirect_uri=" + this.client.redirect_url;
    };

    return Authentication;

  })();

}).call(this);

},{}],3:[function(require,module,exports){
(function() {
  var Base,
    __slice = [].slice;

  Base = (function() {
    function Base(_arg) {
      this.client = _arg.client;
    }

    Base.prototype.url = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return "" + (['https:/', 'api.foursquare.com', 'v2'].concat(args).join('/')) + "?oauth_token=" + this.access_token;
    };

    Base.prototype.perform = function() {
      var type, url_args;
      type = arguments[0], url_args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    };

    Base.prototype.post = function() {
      var url_args;
      url_args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['post'].concat(url_args));
    };

    Base.prototype.get = function() {
      var url_args;
      url_args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['get'].concat(url_args));
    };

    return Base;

  })();

  module.exports = Base;

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  var Client;

  Client = (function() {
    Client.prototype.authenticate = function() {
      return this.authentication = new this.Authentication({
        client: this
      });
    };

    Client.prototype.Authentication = require('./authentication');

    function Client(_arg) {
      this.client_id = _arg.client_id, this.redirect_url = _arg.redirect_url;
    }

    Client.prototype.User = require('./user');

    Client.prototype.utilities = require('./utilities');

    return Client;

  })();

  module.exports = Client;

}).call(this);

},{"./authentication":2,"./user":5,"./utilities":6}],5:[function(require,module,exports){
(function() {
  var Base, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  User = (function(_super) {
    __extends(User, _super);

    function User(_arg) {
      this.client = _arg.client, this.user_id = _arg.user_id;
      User.__super__.constructor.call(this, {
        client: this.client
      });
      this.get();
    }

    User.prototype.base_params = function() {
      return ['users', this.user_id];
    };

    return User;

  })(Base);

  module.exports = User;

}).call(this);

},{"./base":3}],6:[function(require,module,exports){
(function() {
  var Utitlities;

  Utitlities = (function() {
    function Utitlities() {}

    Utitlities.prototype.hash_params = function() {
      return this._hash_params || (this._hash_params = this._parse_hash_params(window));
    };

    Utitlities.prototype.parse_hash_params = function(_window) {
      var hash_pair, key, params_ary, processed_hash, raw_hash, val, _i, _len, _ref, _ref1;
      raw_hash = _window.document.location.hash;
      processed_hash = {};
      _ref = params_ary = raw_hash.substr(1).split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hash_pair = _ref[_i];
        _ref1 = hash_pair.split('='), key = _ref1[0], val = _ref1[1];
        processed_hash[key] = val;
      }
      return processed_hash;
    };

    return Utitlities;

  })();

  module.exports = Utitlities;

}).call(this);

},{}]},{},[1])
;