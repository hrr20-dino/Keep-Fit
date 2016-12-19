const mongoose = require('mongoose');
const Event = require('../events/eventModel');
const EventSchema = mongoose.model('Event').schema;
const Workout = require('../workouts/workoutModel');
const WorkoutSchema = mongoose.model('Workout').schema;

const UserSchema = new mongoose.Schema({
  name: String,
  pass: String,
  salt: String,
  events: [EventSchema],
  workouts: [WorkoutSchema]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;