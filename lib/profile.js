/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @api public
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.id = String(json.sub);
  profile.email = json.email;
  profile.user_meta = json.user_meta;

  return profile;
};
