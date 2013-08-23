var Foursquare = require('../dist/foursquare');

require('chai').should();

describe('foursquare', function() {
  var client = false;

  before(function() {
    client = Foursquare('0DCDMFAT3WSO3ZIDHM5XCQWXN1LUILAXORJV10UCLP15QLKU');
  });

  after(function() {
    client = false;
  });

  it('should exist', function() {
    (client instanceof Foursquare.Client).should.be;
  });
});

