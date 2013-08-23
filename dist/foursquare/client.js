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
