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
  var Authentication, Timeout, authenticationWindow;

  authenticationWindow = false;

  Timeout = 30000;

  Authentication = (function() {
    Authentication.prototype.success = function(callback) {
      this.success = callback;
      return this;
    };

    Authentication.prototype.error = function(callback) {
      this.error = callback;
      return this;
    };

    function Authentication(_arg) {
      this.client = _arg.client, this.timeout = _arg.timeout;
      this.popup();
    }

    Authentication.prototype.popup = function() {
      var authenticationBeganAt, hashParams,
        _this = this;
      if (authenticationWindow && +(new Date) - authenticationBeganAt > Timeout) {
        return this.error();
      } else if (authenticationWindow) {
        hashParams = this.client.utilities.parseHashString(authenticationWindow.document.location.hash.substr(1));
        if (hashParams.access_token) {
          authenticationWindow.close();
          this.client.accessToken = this.accessToken = hashParams.access_token;
          authenticationWindow = false;
          return this.success();
        } else {
          return setTimeout((function() {
            return _this.popup();
          }), 100);
        }
      } else {
        authenticationWindow = window.open(this.url());
        authenticationBeganAt = +(new Date);
        return setTimeout((function() {
          return _this.popup();
        }), 100);
      }
    };

    Authentication.prototype.url = function() {
      return "https://foursquare.com/oauth2/authenticate?client_id=" + this.client.clientId + "&response_type=token&redirect_uri=" + this.client.redirectUrl;
    };

    return Authentication;

  })();

  module.exports = Authentication;

}).call(this);

},{}],3:[function(require,module,exports){
(function() {
  var Base,
    __slice = [].slice;

  Base = (function() {
    function Base(_arg) {
      this.client = _arg.client;
      this.attributes = {};
    }

    Base.prototype.get = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['get'].concat(urlArgs));
    };

    Base.prototype["new"] = function(attributes) {
      attributes || (attributes = {});
      attributes.client = this.client;
      return new this.Instance(attributes);
    };

    Base.prototype.perform = function() {
      var ajaxOptions, data, type, urlArgs, _i,
        _this = this;
      type = arguments[0], urlArgs = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), data = arguments[_i++];
      if (typeof data === 'string') {
        urlArgs.push(data);
        data = void 0;
      }
      ajaxOptions = {
        type: type,
        url: this.url.apply(this, this.baseParams().concat(urlArgs)),
        data: data
      };
      return $.ajax(ajaxOptions).done(function(rsp) {
        var key, val, _ref, _results;
        _ref = rsp.response.user;
        _results = [];
        for (key in _ref) {
          val = _ref[key];
          _results.push(_this.attributes[key] = val);
        }
        return _results;
      });
    };

    Base.prototype.post = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['post'].concat(urlArgs));
    };

    Base.prototype.url = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return "" + (['https:/', 'api.foursquare.com', 'v2'].concat(args).join('/')) + "?oauth_token=" + this.client.accessToken;
    };

    return Base;

  })();

  module.exports = Base;

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  var Client, User, Utilities;

  Utilities = require('./utilities');

  User = require('./user');

  Client = (function() {
    Client.prototype.authenticate = function(success, error) {
      var _this = this;
      return this.authentication = new this.Authentication({
        client: this
      }).success(function() {
        _this.currentUser = _this.User["new"]({
          client: _this,
          userId: 'self'
        });
        return _this.currentUser.get().done(function() {
          return success();
        });
      });
    };

    Client.prototype.Authentication = require('./authentication');

    function Client(_arg) {
      this.clientId = _arg.clientId, this.redirectUrl = _arg.redirectUrl, this.accessToken = _arg.accessToken;
      this.User = new User({
        client: this
      });
    }

    Client.prototype.utilities = new Utilities;

    return Client;

  })();

  module.exports = Client;

}).call(this);

},{"./authentication":2,"./user":5,"./utilities":6}],5:[function(require,module,exports){
(function() {
  var Base, User, method, _fn, _i, _len, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  User = (function(_super) {
    __extends(User, _super);

    function User() {
      _ref = User.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    User.prototype.baseParams = function() {
      return ['users'];
    };

    User.prototype.leaderboard = function() {
      return this.get('leaderboard');
    };

    User.prototype.requests = function() {
      return this.get('requests');
    };

    User.prototype.search = function(data) {
      return this.get('search', data);
    };

    return User;

  })(Base);

  User.prototype.Instance = (function(_super) {
    __extends(Instance, _super);

    function Instance(_arg) {
      var client;
      client = _arg.client, this.userId = _arg.userId;
      Instance.__super__.constructor.call(this, {
        client: client
      });
    }

    Instance.prototype.baseParams = function() {
      return Instance.__super__.baseParams.call(this).concat([this.userId]);
    };

    return Instance;

  })(User);

  _ref1 = 'badges checkins friends lists mayorships photos tips venuehistory'.split(' ');
  _fn = function(endpoint) {
    return User.prototype.Instance.prototype[endpoint] = function(data) {
      return this.get(endpoint, data);
    };
  };
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    method = _ref1[_i];
    _fn(method);
  }

  module.exports = User;

}).call(this);

},{"./base":3}],6:[function(require,module,exports){
(function() {
  var Utitlities;

  Utitlities = (function() {
    function Utitlities() {}

    Utitlities.prototype.parseHashString = function(rawHash) {
      var hashPair, key, paramsAry, processedHash, val, _i, _len, _ref, _ref1;
      processedHash = {};
      _ref = paramsAry = rawHash.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hashPair = _ref[_i];
        _ref1 = hashPair.split('='), key = _ref1[0], val = _ref1[1];
        processedHash[key] = val;
      }
      return processedHash;
    };

    return Utitlities;

  })();

  module.exports = Utitlities;

}).call(this);

},{}]},{},[1])
;