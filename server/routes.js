var helpers = require('./helper.js'); // custom middleware
var morgan = require('morgan'); //<-- debugging
var bodyParser = require('body-parser');
var path = require('path');
var workoutController = require('./api/workouts/workoutController.js');
var exerciseController = require('./api/exercises/exerciseController.js');
var userController = require('./api/users/userController.js');

module.exports = function (app, express) {
  // app.use(morgan()); //<-- debugging
  // app.use(session({
  //   secret: 'shhh, it\'s a secret',
  //   resave: false,
  //   saveUninitialized: true
  // }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.use(express.static(path.join(__dirname, '../client')));

  //need to add this to handle direct addressing of routes.
  //will serve index.html which has our jsx linked for routing.
  app.get('*', function (request, response){
    response.sendFile(path.join(__dirname, '../client/index.html'));
  });

  //initiatie express.Router();
  var router = express.Router();
  //these are the api endpoints and routes.
  router.route('/users')
    .get(userController.getAllUsers)// gets an array of all the users in the database
    .post(userController.addUser);// adds a new user to the database

  router.route('/users/:userId')
    .put(userController.updateUser)//for user settings on the payload attach type of settings
    .delete(userController.deleteUser);//for deleting a user

  // this is the dashboard "/users/:userId/workouts"
  router.route('/users/:userId/workouts')
    .get(workoutController.getWorkouts)//gets all the workouts for that particular user
    .post(workoutController.addWorkout);//adds a workout to the database for that particular user

  // this is for a specific workout which belongs to a user.
  router.route('/users/:userId/workouts/:workoutId')
    .post(exerciseController.addExercise) // <----- ?? what's the point
    .get(workoutController.getWorkout) //gets the workout, and then gets the associated exercises
    .put(workoutController.updateWorkout)//updates a workout
    .delete(workoutController.deleteWorkout);//deleted a workout.

  // this is a specific exercise which belongs to a workout.
  router.route('/users/:userId/workouts/:workoutId/exercises/:exercisesId')
    .put(exerciseController.updateExercise)//updates a workout for a specific routine
    .delete(exerciseController.deleteExercise);//deleted a workout from a specific routine


  app.use('/api', router);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};
