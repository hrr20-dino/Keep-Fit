import { Link, browserHistory }from 'react-router';

export default class Running extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: [],
      exercise: '',
      time: 0,
      distance: 0,
      workoutName: ''
    };

    this.addExercise = this.addExercise.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.completeWorkout = this.completeWorkout.bind(this);
    this.handleWorkoutChange = this.handleWorkoutChange.bind(this);
  }

  handleWorkoutChange(e) {
    this.setState({workoutName: e.target.value});
  }

  handleExerciseChange(e) {
    this.setState({exercise: e.target.value});
  }

  handleTimeChange(e) {
    this.setState({time: e.target.value});
  }

  handleDistanceChange(e) {
    this.setState({distance: e.target.value});
  }

  // This is a bit gross. Shouldn't directly access state like this, but wanted to manage multiple sets and this works. Forced update because we're using state incorrectly.
  addExercise() {
    var set = {
      exercise: this.state.exercise,
      time: this.state.time,
      distance: this.state.distance
    };
    var workout = this.state.workout.slice();
    workout.push(set);
    this.setState({ workout: workout });
    // this.forceUpdate();
    // this uses the ref on the input to reset the focus to the first field after submit.
    this._ex.focus();
  }

  // Submits packaged workout obj to db as x-www-form data.
  completeWorkout(e) {
    e.preventDefault();
    var newWorkout = {};
    // newWorkout.workoutType = 'weight-lifting';
    newWorkout.workoutName = this.state.workoutName;
    newWorkout.exercise = this.state.workout;
    $.post('/api/createWorkout', newWorkout, (err, resp)=>{
      if (err) {console.log('Huzahhh!', err)};
    });
    browserHistory.push('/user');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 signup-form text-center">
            <h1>Add Workout!</h1>
            <div className="col-sm-8 col-sm-offset-2">
              <form>
                <label className="text-left">Workout Name:
                  <input
                    type='text'
                    placeholder='Workout Name'
                    className="fat-width"
                    onChange={this.handleWorkoutChange}
                    />
                </label>
                <table>
                  <thead>
                    <tr>
                      <td>Exercise</td>
                      <td>Time</td>
                      <td>Distance</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.workout.map((i, k) => {
                      return <tr key={k} className="setDisplay">
                        <td>{i.exercise}</td>
                        <td>{i.time}</td>
                        <td>{i.distance}</td>
                        <td> </td>
                      </tr>
                    })}
                    <tr>
                      <td><input type="text" ref={input => this._ex = input} autoFocus value={this.state.exercise} onChange={this.handleExerciseChange}/></td>
                      <td><input type="number" className="thin-width" value={this.state.time} onChange={this.handleTimeChange}/></td>
                      <td><input type="number" className="thin-width" value={this.state.distance} onChange={this.handleDistanceChange}/></td>
                      <td>
                        <a href="#" onClick={this.addExercise}>Add set</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type='submit'
                  value='Add Workout'
                  className="btn btn-default margin-top-10"
                  onClick={this.completeWorkout}
                  >Complete Workout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
}