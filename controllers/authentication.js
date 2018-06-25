const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = (req, res, next) => {
  //user has already had their email and password authenticated
  //we just need to give them a token
  res.json({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  //see if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    //if email exists, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    //if the email does not exist, create and save user record
    const user = new User({ email, password });
    user.save(err => {
      if (err) {
        return next(err);
      }
      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
