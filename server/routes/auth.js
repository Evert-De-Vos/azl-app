var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var tokenDecoder = require('jsonwebtoken');
var passport = require('passport');
var router = express.Router();

var tokenGenerator = require('../config/tokenGenerator');

var config = require('../config/config');
var User = mongoose.model('User');
var Member = mongoose.model('Member');

var auth = jwt({
  secret: config.secret,
  userProperty: config.userProperty
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Vul alle velden in'
    });
  }

  passport.authenticate('user-local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(200).json({
        token: tokenGenerator(user)
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/register', auth, function (req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(406).json({
      message: 'Vul alle velden in'
    });
  }

  if (User.findOne({
      username: req.body.username
    }), function (data) {
      if (data != null) {
        return res.status(409).json({
          message: 'Het gebruikersnaam is al bezet.'
        });
      }
    });

  if (User.findOne({
      email: req.body.email
    }), function (data) {
      if (data != null) {
        return res.status(409).json({
          message: 'Het emailadres is al bezet.'
        });
      }
    });

  var user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.members = [];

  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      token: tokenGenerator(user)
    });
  });
});



router.post('/changepassword', auth, function (req, res, next) {

  if (!req.body.oldpass || !req.body.newpass) {
    return res.status(400).json({
      message: 'Alle velden aanvullen'
    });
  }

  token = tokenDecoder.decode(req.headers.authorization.split(' ')[1], config.secret);

  User.findById(token.id, function (err, user) {
    if (err || !user) {
      return res.status(500).json("Server error");
    }

    user.comparePassword(req.body.oldpass, function (err, match) {
      if (err) {
        return next(err);
      }

      if (match) {
        user.password = req.body.newpass;
        user.isHashed = false;
        user.save(function (err) {
          if (err) {
            return next(err);
          }

          return res.status(200).json({
            token: tokenGenerator(user)
          });
        });
      } else {
        return res.status(403).json({
          message: 'incorrect password'
        });
      }
    });
  });
});

module.exports = router;
