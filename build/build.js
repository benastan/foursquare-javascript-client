
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("foursquare/dist/foursquare.js", function(exports, require, module){
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

});
require.register("foursquare/dist/foursquare/base.js", function(exports, require, module){
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

});
require.register("foursquare/dist/foursquare/client.js", function(exports, require, module){
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

});
require.register("foursquare/dist/foursquare/user.js", function(exports, require, module){
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

});
require.register("foursquare/dist/foursquare/utilities.js", function(exports, require, module){
(function() {
  var Utitlities;

  Utitlities = (function() {
    function Utitlities() {}

    Utitlities.prototype.hash_params = function() {
      return this._hash_params || (this._hash_params = this.parse_hash_params(window));
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

});
require.alias("foursquare/dist/foursquare.js", "foursquare/index.js");

