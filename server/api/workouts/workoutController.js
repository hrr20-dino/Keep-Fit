const Promise = require('bluebird');
const Workout = require('./workoutModel');

module.exports = {
  //Adds a user's routine to the Routine table
  getWorkouts: function (req, res, next) {


    // Models.Routine.build({
    //   name: req.body.name,
    //   description: req.body.description,
    //   start_time: req.body.start_time,
    //   end_time: req.body.end_time,
    //   repeat: req.body.repeat,
    //   completed: req.body.completed
    // }).save()
    // .then(function(){
    //   res.status(201).send('Successfully created routine!')
    // })
    // .catch(function(error){
    //   res.status(404).send(error);
    // })
  },

  //Gets the routines for the current user
  addWorkout: function(req, res, next) {


    // .then(function(routines){
    //   res.status(200).json(routines);
    // })
    // .catch(function(error) {
    //   res.send(error);
    // });
  },

  //Gets a single routine for a user
  getWorkout: function(req, res, next) {


    // .then(function(routine){
    //   console.log(routine);
    //   res.status(200).json(routine);
    // })
    // .catch(function(error) {
    //   res.send(error);
    // });
  },

  //Deletes a user's routine from the Routine table
  updateWorkout: function(req, res, next) {


    // .then(function() {
    //   res.status(200).send('Routine successfully deleted!')
    // })
    // .catch(function(error){
    //   res.send(error);
    // });
  },

  deleteWorkout: function(req, res, next) {

  },
}