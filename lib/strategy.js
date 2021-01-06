const util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError
  , Profile = require('./profile')
  , uri = require('url')
  , jwt = require('jsonwebtoken');

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
  options.pkce = true;
  options.state = true;
  options.scope = 'email';
  options.authorizationURL = 'https://staging.auth.swoop.email/oauth2/authorize';
  options.tokenURL = 'https://staging.auth.swoop.email/oauth2/token';
  this._userProfileURL = options.userProfileURL || 'https://staging.auth.swoop.email/oauth2/profile';
  this.optionVerify = verify;
  const self = this;
  const __verify = async function(accessToken, refreshToken, params, profile, done) {
    try {
      let idToken = params.id_token;
      let json = jwt.verify(idToken, options.clientSecret);
      var decoded = Profile.parse(json);
      // Decode the id_token to get user_meta (if passed in)
      profile.user_meta = decoded.user_meta;
      profile._json = json;
      profile._id_token = idToken;
      self.optionVerify(profile, done);
    } catch(e) {
      done(e);
    }
  }

  OAuth2Strategy.call(this, options, __verify);
  this.name = 'swoop'
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.authenticate = function(req, options) {
  OAuth2Strategy.prototype.authenticate.call(this, req, options);
};

Strategy.prototype.userProfile = function(accessToken, done) {
  var url = uri.parse(this._userProfileURL);
  url = uri.format(url);

  this._oauth2.get(url, accessToken, function (err, body, res) {
    var json;

    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }

      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      console.log(body)
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json);
    profile.provider = 'swoop';
    profile._raw = body;

    done(null, profile);
  });
}

/**
 * Return extra parameters to be included in the authorization request.
 *
 * Some OAuth 2.0 providers allow additional, non-standard parameters to be
 * included when requesting authorization.  Since these parameters are not
 * standardized by the OAuth 2.0 specification, OAuth 2.0-based authentication
 * strategies can overrride this function in order to populate these parameters
 * as required by the provider.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
 OAuth2Strategy.prototype.authorizationParams = function(options) {
   let params = {};

   if(!options.user_meta) return params;

   for (const [key, value] of Object.entries(options.user_meta)) {
     let objKey = `user_meta[${key}]`;
     params[objKey] = value;
   }
   return params;
 };

module.exports = Strategy
