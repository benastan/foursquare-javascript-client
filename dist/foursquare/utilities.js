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
