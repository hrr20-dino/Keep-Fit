const Promise = require('bluebird');
const Workout = require('./workoutModel');
const Exercise = require('./exerciseModel');

module.exports = {
  //Adds a user's routine to the Routine table
  getWorkouts: function (req, res, next) {
    var user = req.params.userId;
    Workout.find({ userId: user })
    .then(function(workouts){
      res.status(200).json(workouts)
    })
    .catch(function(error){
      res.status(404).send(error);
    })
  },

  //Gets the routines for the current user
  addWorkout: function(req, res, next) {
    var user = req.params.userId;
    var newWorkout = {
      userId: user,
      exercise: req.body.exercises //<-- exercises array;
    }

    Workout.create(newWorkout)
    .then(function(newWorkout){
      res.status(200).json(newWorkout);
    })
    .catch(function(error){
      res.status(404).send(error);
    })
  },

    //-----------The following concept can be implemented for future versions if you decide to use an       exercise schema.
    //
    //
    // var exercises = req.body.exercises //<-- should be an array
    // exercises.forEach(exercise) {
    //   var newExercise = {
    //     workoutId: req.params.workoutId,
    //     name: exercise.name,
    //     type: exercise.type,
    //     metrics: exercise.metrics //<-- should be an array
    //   }
    //    Exercise.create(exercise)
    // }
    //


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