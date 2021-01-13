/* global describe, it, before, expect */
/* jshint expr: true */

var SwoopStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {

  describe('fetched from default endpoint', function() {
    var strategy = new SwoopStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://auth.swoop.email/oauth2/profile') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"sub":"6e1f795771381c2ad70a8728","email":"info@swoopnow.com"}';
      callback(null, body, undefined);
    };

    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('6e1f795771381c2ad70a8728')
      expect(profile.email).to.equal('info@swoopnow.com')
    });

    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
  }); // fetched from default endpoint


});
