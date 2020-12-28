/* global describe, it, before, expect */
/* jshint expr: true */

var Profile = require('../lib/profile')
  , fs = require('fs')


describe('Profile.parse', function() {

  describe('profile with user meta', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/fixtures/swoop_user.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.email).to.equal('info@swoopnow.com');
      expect(profile.id).to.equal('6e1f795771381c2ad70a8728');
      expect(profile.user_meta.first_name).to.equal('Swoop');
      expect(profile.user_meta.last_name).to.equal('In');
    });
  });

  describe('profile without user meta', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/fixtures/swoop_user_no_meta.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('6e1f795771381c2ad70a8728');
      expect(profile.user_meta).to.be.undefined;
    });
  });

});
