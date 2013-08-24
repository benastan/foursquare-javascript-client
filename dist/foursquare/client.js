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
