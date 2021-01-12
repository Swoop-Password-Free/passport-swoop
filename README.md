# passport-swoop

[Passport](http://passportjs.org/) strategy for authenticating with [Swoop](http://swoopnow.com/)
using the OAuth 2.0 API and PKCE.

This module lets you authenticate your users password free with Swoop in your Node.js applications.
By plugging into Passport, Swoop authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

---

## Install

```bash
$ npm install passport-swoop
```

## Usage

#### Create an Application

Before using `passport-swoop`, you must register a property with Swoop (free).
If you have not already done so, a new application can be created at
[swoop.email](https://dashboard.swoop.email/).  Your application
will be issued a client id and client secret, which need to be provided to the
strategy.  You will also need to configure a callback URL which matches the
route in your application.

#### Configure Strategy

The Swoop authentication strategy authenticates users using their email account
and OAuth tokens.  The client id and client secret obtained when creating
an application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the profile containing
the user's email and swoop id as arguments. The `verify` callback must call `cb`
providing a user to complete authentication.

```javascript
passport.use(new SwoopStrategy({
    clientID: process.env['SWOOP_CLIENT_ID'],
    clientSecret: process.env['SWOOP_CLIENT_SECRET'],
    callbackURL: 'http://localhost:3000/auth/swoop/callback'    
  },
  function(profile, cb) {    
    return cb(null, profile);
  }));
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'swoop'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/swoop',
  passport.authenticate('swoop'));

app.get('/auth/swoop/callback',
  passport.authenticate('swoop', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/Swoop-Password-Free/express-4.x-swoop-example)
as a starting point for their own web applications.

## Testing
If you are contributing to this node package you can test it by:

(1) running `npm link` from the package's root directory  
(2) running `npm link passport-swoop` from the directory of a test application

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021 Swoop In Technologies <[http://swoopnow.com/](https://swoopnow.com/)>
