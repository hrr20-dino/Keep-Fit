import { Link, browserHistory }from 'react-router';

export default class WeightLifting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: '',
      exercise: '',
      weight: 0,
      reps: 0,
      exercises: []
    };

    this.addExercise = this.addExercise.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.handleWorkoutChange = this.handleWorkoutChange.bind(this);
  }

  handleWorkoutChange(e) {
    this.setState({workoutName: e.target.value});
  }

  handleExerciseChange(e) {
    this.setState({exercise: e.target.value});
  }

  handleWeightChange(e) {
    this.setState({weight: e.target.value});
  }

  handleRepChange(e) {
    this.setState({reps: e.target.value});
  }

  // This is a bit gross. Shouldn't directly access state like this, but wanted to manage multiple sets and this works. Forced update because we're using state incorrectly.
  addExercise() {
    var set = {
      exercise: this.state.exercise,
      weight: this.state.weight,
      reps: this.state.reps
    };
    var exercises = this.state.exercises.slice();
    exercises.push(set);
    this.setState({ exercises: exercises });
    // this.forceUpdate();
    // this uses the ref on the input to reset the focus to the first field after submit.
    this._ex.focus();
  }

  // Submits packaged workout obj to db as x-www-form data.
  addWorkout(e) {
    e.preventDefault();
    var newWorkout = {};
    newWorkout.type = 'weight-lifting';
    newWorkout.name = this.state.workoutName;
    newWorkout.exercises = JSON.stringify(this.state.exercises);

    var userId = window.sessionStorage.user;
    $.post(`api/users/${userId}/workouts`, newWorkout, (err, resp)=>{
      if(err) {
        console.log('Your workout cannot be submitted at this time. ' +  err);
      } else {
        console.log('The following workout has been submitted: ' + resp);
      }
    });
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 signup-form text-center">
            <h2>Weight Lifting</h2>
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
                      <td>Weight</td>
                      <td>Reps</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.exercises.map((i, k) => {
                      return <tr key={k} className="setDisplay">
                        <td>{i.exercise}</td>
                        <td>{i.weight}</td>
                        <td>{i.reps}</td>
                        <td> </td>
                      </tr>
                    })}
                    <tr>
                      <td><input type="text" ref={input => this._ex = input} autoFocus value={this.state.exercise} onChange={this.handleExerciseChange}/></td>
                      <td><input type="number" min="0" className="thin-width" value={this.state.weight} onChange={this.handleWeightChange}/></td>
                      <td><input type="number" min="0" className="thin-width" value={this.state.reps} onChange={this.handleRepChange}/></td>
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
                  onClick={this.addWorkout}
                  >Add Workout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
}
