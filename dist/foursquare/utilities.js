(function() {
  var Utitlities;

  Utitlities = (function() {
    function Utitlities() {}

    Utitlities.prototype.parseHashString = function(rawHash) {
      var hashPair, key, paramsAry, processedHash, val, _i, _len, _ref, _ref1;
      processedHash = {};
      _ref = paramsAry = rawHash.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hashPair = _ref[_i];
        _ref1 = hashPair.split('='), key = _ref1[0], val = _ref1[1];
        processedHash[key] = val;
      }
      return processedHash;
    };

    return Utitlities;

  })();

  module.exports = Utitlities;

}).call(this);
