const jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var Promise  = require('bluebird');
var User = Promise.promisifyAll(require('./userModel'))


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
  signIn: function (req, res, next) {
    const name = req.body.name;
    const pass = req.body.pass;

    User.findOne({name: name})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          bcrypt.compare(pass, user.get('pass'), function(err, match) {
            if (match) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token, name: user._id});
            } else {
              return next(new Error('No user'));
            }
          })
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  signUp: function (req, res, next) {
    const name = req.body.name;
    const pass = req.body.pass;

  // check to see if user already exists
  User.findOne({name: name})
    .then(function (user) {
      if (user) {
        next(new Error('User already exist!'));
      } else {
        return bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return next(err);
          }
          bcrypt.hash(pass, salt, null, function (err, hash) {
            if (err) {
              return next(err);
            }
              return User.create({
              name: name,
              pass: hash,
              salt: salt
            })
            .then(function(user) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token, name: user._id});
            })
          });
        });
      }
    })
    .catch(function (error) {
      next(error);
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


  getUsers: function(req, res, next) {
    const searchParams = req.body || {};
    User.find(searchParams, (err, users) => {
      if (err) {
        console.error('Error getting users', err);
        res.sendStatus(404);
      } else {
        res.json(users);
      }

      next();
    });
  },

  updateUser: function(req, res, next) {
    User.findOne({
      _id: req.params.userId

    }, (err, user) => {
      if (err) {
        console.error('Error finding user', err);
        res.sendStatus(404);
      } else {
        Object.assign();
        user.save((err) => {
          if (err) {
            console.error('Error updating user', err);
            res.sendStatus(500);
          } else {
            res.sendStatus(204);
            next();
          }
        });
      }
    });
  },

  deleteUser: function(req, res, next) {
    User.remove({
      _id: req.params.userId

    }, (err, user) => {
      if (err) {
        console.error('Error deleting user', err);
      } else {
        res.sendStatus(204);
        next();
      }
    });
  },

  getUser: function(req, res, next) {
    User.findOne({
      _id: req.params.userId

    }, (err, user) => {
      if (err) {
        console.error('Error retrieving user', err);
        res.sendStatus(404);
      } else {
        res.json(user);
      }

      next();
    });
  },

  addUser: function(req, res, next) {
    console.log(req.body)
    const newUser = new User(req.body);
    newUser.save((err, newUserObject) => {
      if (err) {
        console.error('Error saving user', err);
        res.sendStatus(404);
      } else {
        res.json(newUserObject._id);
      }

      next();
    });
  }

};