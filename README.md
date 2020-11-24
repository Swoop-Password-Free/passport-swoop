## Description
Custom passport strategy for [Swoop](http://swoopnow.com), a password-free authentication tool. 

## Usage
Run `npm install passport-swoop` to install the package

`passport-swoop` is intended to be used in conjunction with passport to implement a custom swoop strategy. For example:

```
passport.use(new SwoopStrategy({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/swoop/callback'
}, function(accessToken, refreshToken, params, profile, done) {
  let user = jwtDecode(params.id_token);
  done(null, user);   
}));
```

## Testing
If you are contributing to this node package you can test it by:

(1) running `npm link` from the package's root directory
(2) running `npm link swoop` from the directory of a test application

