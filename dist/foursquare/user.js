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
