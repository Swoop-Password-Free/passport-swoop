const util = require('util');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * `Strategy` constructor.
 *
 * The Swoop authentication strategy authenticates requests by delegating to
 * Swoop using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Swoop property's CLIENT ID
 *   - `clientSecret`  your Swoop property's SECRET
 *   - `callbackURL`   URL to which Swoop will redirect the user after granting authorization
 *
 * Examples:
 *
 *    passport.use(new SwoopStrategy({
 *      clientID: 'CLIENT_ID',
 *      clientSecret: 'CLIENT_SECRET',
 *      callbackURL: 'http://localhost:3000/auth/swoop/callback'
 *    }, function(accessToken, refreshToken, params, profile, done) {
 *      let user = jwtDecode(params.id_token);
 *      done(null, user);
*     }));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */

function Strategy(options, verify){
  options = options || {};
  options.authorizationURL = 'https://auth.swoop.email/oauth2/authorize';
  options.tokenURL = 'https://auth.swoop.email/oauth2/token';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'swoop'
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.authenticate = function(req, options) {
  OAuth2Strategy.prototype.authenticate.call(this, req, options);
};

module.exports = Strategy