const User = require('../users/userModel');
const Event = require('./eventModel');

module.exports = {
  getEvents: function(req, res, next) {
    User.findOne({
      _id: req.params.userId
    }, (err, user) => {
      if (err) {
        console.error('Error finding user', err);
        res.sendStatus(404);
      } else {
        res.json(user.events);
      }

      next();
    });
  },

  addEvent: function(req, res, next) {
    const newEvent = new Event(req.body);
    newEvent.save((err, newEventObject) => {
      if (err) {
        console.error('Error adding event', err);
        res.sendStatus(404);
      } else {
        User.findOne({
          _id: req.params.userId
        }, (err, user) => {
          if (err) {
            console.error('Error finding user', err);
            res.sendStatus(404);
          } else {
            user.events.push(newEvent);
            user.save((err) => {
              if (err) {
                console.error('Error saving adding event to user', err);
                res.sendStatus(404);
              } else {
                res.json(newEventObject._id);
              }

              next();
            });
          }
        });
      }
    });
  }
};
