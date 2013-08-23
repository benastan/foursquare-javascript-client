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
