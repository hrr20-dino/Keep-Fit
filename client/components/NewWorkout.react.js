'use strict'

import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class NewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Panel header="Create A Workout">
          <form>
            <FormGroup>
              <FormControl>

              </FormControl>
            </FormGroup>
          </form>
        </Panel>
      </div>
    )
  }






}
