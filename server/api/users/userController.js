const Promise = require('bluebird');
const User = require('./userModel');

module.exports = {
  //Adds a user's routine to the Routine table
  addUser: function (req, res, next) {


    // .then(function(){
    //   res.status(201).send('Successfully created routine!')
    // })
    // .catch(function(error){
    //   res.status(404).send(error);
    // })
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

}