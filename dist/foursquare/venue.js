(function() {
  var Base, Venue, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Venue = (function(_super) {
    __extends(Venue, _super);

    function Venue() {
      _ref = Venue.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Venue;

  })(Base);

  Venue.endpoints(function() {
    this.base('venues');
    this.get('add');
    return this.get('search');
  });

  module.exports = User;

}).call(this);
