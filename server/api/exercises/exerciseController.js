const Promise = require('bluebird');
const Exercise = require('./exerciseModel');

module.exports = {
  //Adds a user's routine to the Routine table
  updateExercise: function (req, res, next) {


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
  deleteExercise: function(req, res, next) {

    // .then(function(routines){
    //   res.status(200).json(routines);
    // })
    // .catch(function(error) {
    //   res.send(error);
    // });
  },

}