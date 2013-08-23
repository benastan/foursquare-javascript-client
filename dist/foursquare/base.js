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
