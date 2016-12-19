import {Link} from 'react-router';
import Nav from './Nav.jsx';
import HeatMap from './HeatMap.jsx';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weightLifting: [],
      running: []
    };
    this.getUsersWorkouts = this.getUsersWorkouts.bind(this);
    this.completeWorkoutHandler = this.completeWorkoutHandler.bind(this);
    this.displayWeightLiftingWorkouts = this.displayWeightLiftingWorkouts.bind(this);
    this.workoutPanels = this.workoutPanels.bind(this);

  }

  componentDidMount() {
    this.getUsersWorkouts();
  }

  getUsersWorkouts() {
    var that = this;
    $.get(`api/users/${userId}/workouts`, function(data) {
      if(data) {
        console.log('success!', data);
        data.forEach(function(workout) {
          var parsedExercises = JSON.parse(workout.exercises);
          workout.exercises = parsedExercises;
          if(workout.type === 'weight-lifting') {
            var weightLifting = that.state.weightLifting.slice();
            weightLifting.push(workout);
            that.setState({ weightLifting: weightLifting});
          }
        });
      }
    });
  }

  completeWorkoutHandler() {
    var didTheThing = {};
    didTheThing.workedOut = true;
    $.post(`api/users/${userId}/events`, didTheThing, function(err, resp) {
      if(err) {
        console.log('Uh-Oh.. your workout cannot be completed at this time. Sorry! ', err);
      } else {
        console.log('Woohoo! You have completed your workout. Keep it up! ', resp);
      }
    });
  }



  displayWeightLiftingWorkouts() {
    var that = this;
    let workoutPanels = () => {
      return (
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
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
              <button type="button" className="btn btn-default" onClick={that.completeWorkoutHandler}>
                Complete Workout
              </button>
            </div>
          </div>
        </div>
      )
    };
    this.state.weightLifting.map( (workout, index) => {
          $('#prependWorkouts').prepend(that.workoutPanels());
      })};
  }

  render() {
    return (
      <div>
        {<Nav />}
        <div className="container-fluid">
          {/*}<HeatMap />*/}
          {/*}<div className="row">*/}
          <div className="row">
            <button type="button" className="btn btn-default" onClick={this.displayWeightLiftingWorkouts}>
              Weight-Lifting
            </button>
          </div>
            <div id="prependWorkouts"></div>
          {/*}</div>*/}
        </div>
      </div>
    )
  }
}
