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
  describe('#hash_params', function() {
    before(function() {
      if (!  global.document) { global.document = {}; }
      if (! global.document.location) { global.document.location = {}; }
      hash = global.document.location.hash;
      global.document.location.hash = hash === '' ? '#param=something' : hash;
    });
    it('processes the hash', function() {
      utilities.hash_params().param.should.equal('something');
    });
  });
});
