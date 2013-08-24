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
