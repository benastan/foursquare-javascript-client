var Utilities = require('../../dist/foursquare/utilities');

if (typeof chai === 'undefined') { var chai = require('chai'); }
chai.should();

describe(Utilities, function() {
  var utilities;
  before(function() {
    utilities = new Utilities();
  });
  after(function() {
    utilities = false;
  });
  describe('#parseHashString', function() {
    var hash;
    before(function() {
      hash = 'param=something&blah=booo';
    });
    it('processes the hash', function() {
      var params = utilities.parseHashString(hash);
      params.param.should.equal('something');
      params.blah.should.equal('booo');
    });
  });
});
