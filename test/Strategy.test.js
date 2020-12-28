/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , SwoopStrategy = require('../lib/strategy');


describe('Strategy', function() {

  describe('constructed', function() {
    var strategy = new SwoopStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});

    it('should be named swoop', function() {
      expect(strategy.name).to.equal('swoop');
    });
  })

  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new SwoopStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })

});
