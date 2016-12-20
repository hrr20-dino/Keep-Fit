import {Link} from 'react-router';
import Nav from './Nav.jsx';
import HeatMap from './HeatMap.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: []
    };
    this.getUsersWorkouts = this.getUsersWorkouts.bind(this);
    this.completeWorkoutHandler = this.completeWorkoutHandler.bind(this);
    this.deletePendWorkout = this.deletePendWorkout.bind(this);
  }

  componentDidMount() {
    this.getUsersWorkouts();
  }

  // shouldComponentUpdate() {
  //   return true;
  //   console.log('Updating');
  // }

  completeWorkoutHandler(workoutId) {
    var didTheThing = {};
    var userId = window.sessionStorage.user;
    console.log("userID", userId)
    didTheThing.workedOut = true;
    $.post(`/api/users/${userId}/events`, didTheThing, function(resp) {
      if(resp) {
        console.log('Woohoo! You have completed your workout. Keep it up! ', resp);
        $.ajax({
          url: `/api/users/${userId}/pending/${workoutId}`,
          type: 'DELETE',
          success: function(resp) {
              console.log('Your workout has been completed and deleted. Great job! ', resp);
          }
        });
      } else {
        console.log('Uh-Oh.. your workout cannot be completed at this time. Sorry!');
      }
    });
  }

  getUsersWorkouts() {
    var that = this;
    var userId = window.sessionStorage.user;
    $.get(`/api/users/${userId}/pending`, function(data) {
      if(data) {
        console.log('success!', data);
        var workouts = that.state.workouts.slice();
        data.forEach(function(workout) {
          var parsedExercises = JSON.parse(workout.exercises);
          workout.exercises = parsedExercises;
          // var workouts = that.state.workouts.slice();
          workouts.push(workout);
          // that.setState({ workouts: workouts });
        });
        that.setState({ workouts: workouts });
      }
    });
  }

  deletePendWorkout(workoutId) {
    console.log(workoutId);
    var that = this;
    var userId = window.sessionStorage.user;
    $.ajax({
      url: `/api/users/${userId}/pending/${workoutId}`,
      type: 'DELETE',
      success: function() {
        console.log('Your workout has been deleted. ');
        that.getUsersWorkouts();
      }
    });
  }

  render() {
    return (
      <div>
        {<Nav />}
        <div className="container-fluid">
          {<HeatMap/>}
          <div className="row">
            {this.state.workouts.map( (workout, index) => {
              return (
                <div className="col-md-4">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        <button type="button" className="close" aria-label="Close" onClick={this.deletePendWorkout.bind(this, workout._id)}><span aria-hidden="true">&times;</span></button>
                        {workout.name}
                      </h3>
                    </div>
                    <div className="panel-body">
                      <table>
                        <thead>
                          <tr>
                            <td>Exercise</td>
                            <td>Weight</td>
                            <td>Reps</td>
                          </tr>
                        </thead>
                        <tbody>
                        {workout.exercises.map( (exercise, index) => {
                          return (
                            <tr key={index}>
                              <td>{exercise.exercise}</td>
                              <td>{exercise.weight}</td>
                              <td>{exercise.reps}</td>
                            </tr>
                          )
                        })}
                        </tbody>
                      </table>
                    </div>
                    <div className="panel-footer flex-center">
                      <button type="button" className="btn btn-default" onClick={this.completeWorkoutHandler.bind(this, workout._id)}>
                        Complete Workout
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
