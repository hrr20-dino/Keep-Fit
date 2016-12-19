'use strict';

import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Dashboard from './Dashboard.jsx';
import WeightLifting from './WeightLifting.jsx';
import HeatMap from './HeatMap.jsx';
import Running from './Running.jsx';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Splash from './Splash.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Splash}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/lifting' component={WeightLifting}/>
    <Route path='/running' component={Running}/>
    <Route path='/heatmap' component={HeatMap}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/signin' component={Signin}/>
  </Router>
), document.getElementById('app'));
