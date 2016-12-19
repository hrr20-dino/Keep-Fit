'use strict'

import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state= {

    }

  }

  reRouteAddWorkout() {
    return (
      <Link to='/lifting'>Add Workout</Link>
    )
  }

  render() {
    return (
      <div>
        <div className="container-fullwidth">
          <nav className="navbar navbar-default navbar-static purple">
            <div className="navbar-header">
              <img className="logo" src="../../assets/kf.png"/>
            </div>
              {/* This is where we could add dynamic user login status
            <div className="navbar-right text-white">User</div>*/}
            <button type="button" className="btn btn-default btn-lg navbutton-right">
              {this.reRouteAddWorkout()}
            </button>
          </nav>
        </div>
      </div>
    )
  }
}
