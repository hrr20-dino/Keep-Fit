'user strict';

import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import WeightLifting from './WeightLifting.jsx';

export default AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [];
    }
  }

  getSavedWorkouts() {
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

  render {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 signup-form text-center">
            <h2>Add A Workout</h2>
            <div className="col-sm-8 col-sm-offset-2">
              <form>
                <label className="text-left">Your Saved Workouts:
                  {}
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value="">
                    </label>
                  </div>
                </label>
                <table>
                  <thead>
                    <tr>
                      <td>Exercise</td>
                      <td>Weight (lbs.)</td>
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
  }
}
