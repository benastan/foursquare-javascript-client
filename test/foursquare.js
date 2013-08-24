var Foursquare = require('../dist/foursquare');

require('chai').should();

describe('Foursquare', function() {
  var client = false,
      accessToken = undefined;

  before(function() {
    client = Foursquare({
      clientId: 'U5VBW3CWRJGH53DZ1KMUZC34VLSFAQ5VK240RNTUQPZ2DW5S',
      redirectUrl: 'http://localhost:3000/auth',
      accessToken: accessToken
    });
  });

  after(function() {
    client = false;
  });

  describe('Foursquare()', function() {
    it('should exist', function() {
      (client instanceof Foursquare.Client).should.be;
    });
  });

  describe('Client::authenticate', function() {
    it('can authenticate', function(done) {
      client.authenticate(function() {
        client.accessToken.should.be.a('string');
        client.currentUser.should.be.a('object');
        accessToken = client.accessToken;
        done();
      });
    });
  });

  describe('Client::User', function() {
    it('can retrieve the leaderboard', function() {
      client.User.leaderboard();
    });
  });

  describe('Client::User.new', function() {
    it("can retrieve the user's checkins", function(done) {
      client.currentUser.checkins().done(function(rsp) {
        (rsp.response.checkins.items instanceof Array).should.equal(true);
        done();
      });
    });

    it("can retrieve the user's badges", function(done) {
      client.currentUser.badges().done(function(rsp) {
        (rsp.response.badges instanceof Object).should.equal(true);
        done();
      });
    });

    it("can retrieve the user's friends", function(done) {
      client.currentUser.friends().done(function(rsp) {
        rsp.response.friends.items.length.should.be.a('number');
        done();
      });
    });

    it("can retrieve the user's lists", function(done) {
      client.currentUser.lists().done(function(rsp) {
        rsp.response.lists.groups.length.should.be.a('number');
        done();
      });
    });

    it("can retrieve the user's mayorships", function(done) {
      client.currentUser.mayorships().done(function(rsp) {
        rsp.response.mayorships.items.length.should.be.a('number');
        done();
      });
    });

    it("can retrieve the user's photos", function(done) {
      client.currentUser.photos().done(function(rsp) {
        rsp.response.photos.items.length.should.be.a('number');
        done();
      });
    });
  });

  describe('done', function() {
    it('is done');
  });
});

