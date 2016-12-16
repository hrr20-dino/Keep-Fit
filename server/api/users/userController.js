const Promise = require('bluebird');
const User = require('./userModel');
//const jwt = require('jwt-simple');
//const session = require('express-session');
//var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;


//utility functions------------------------------------
///////////////////////////

var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

var checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

///////////////////////////
//-----------------------------------------------------


module.exports = {
    signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .then(function(user) {
        if (!user) {
          res.redirect('/login');
        } else {
          bcrypt.compare(password, user.get('password'), function(err, match) {
            if (match) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
            } else {
              res.redirect('/login');
            }
          });
        }
    });

  },

  signup: function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.create({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        bcrypt.hash(password, null, null, function(err, hash) {
          Users.create({
            username: username,
            password: hash
          }).then(function(user) {
              createSession(req, res, user);
          });
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
  },


  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },


  //Gets the routines for the current user
  getAllUsers: function(req, res, next) {


    // .then(function(routines){
    //   res.status(200).json(routines);
    // })
    // .catch(function(error) {
    //   res.send(error);
    // });
  },

  //Gets a single routine for a user
  updateUser: function(req, res, next) {


    // .then(function(routine){
    //   console.log(routine);
    //   res.status(200).json(routine);
    // })
    // .catch(function(error) {
    //   res.send(error);
    // });
  },

  //Deletes a user's routine from the Routine table
  deleteUser: function(req, res, next) {

    // .then(function() {
    //   res.status(200).send('Routine successfully deleted!')
    // })
    // .catch(function(error){
    //   res.send(error);
    // });
  },

  addUser: function(req, res, next) {

    // .then(function() {
    //   res.status(200).send('Routine successfully deleted!')
    // })
    // .catch(function(error){
    //   res.send(error);
    // });
  },

}