(function() {
  var Base, User, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  User = (function(_super) {
    __extends(User, _super);

    function User() {
      _ref = User.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return User;

  })(Base);

  User.endpoints(function() {
    this.base('users');
    return this.get(['leaderboard', 'requests', 'search']);
  });

  User.prototype.Instance = (function(_super) {
    __extends(Instance, _super);

    function Instance(_arg) {
      var client;
      client = _arg.client, this.userId = _arg.userId;
      Instance.__super__.constructor.call(this, {
        client: client
      });
    }

    Instance.prototype.update = function() {
      throw new Error('User#update not yet implemented');
    };

    return Instance;

  })(User);

  User.prototype.Instance.endpoints(function() {
    this.base([this.userId]);
    this.get(['badges', 'checkins', 'friends', 'lists', 'mayorships', 'photos', 'tips', 'venuehistory']);
    return this.post(['approve', 'deny', 'request', 'setpings', 'unfriend']);
  });

  module.exports = User;

}).call(this);
