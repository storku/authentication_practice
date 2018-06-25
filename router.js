const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

//middleware / interceptor to the authenticated routes
requireAuth = passport.authenticate('jwt', { session: false });
requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
