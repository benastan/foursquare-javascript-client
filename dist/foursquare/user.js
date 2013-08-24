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
