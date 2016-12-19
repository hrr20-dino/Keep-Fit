'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='jumbotron flex-center purple keep-fit-logo'>
          <Link to='signin'><button className='btn btn-small sign-in-button'>Sign in</button></Link>
          <h1>Keep Fit</h1>
        </div>
        <div className='container-fluid keep-fit-splash-columns'>
          <div className='row'>
            <div className='col-md-4'>
              <span className='glyphicon glyphicon-heart flex-center' aria-hidden='true' />
              <h3 className='flex-center'>Built for your health</h3>
            </div>
            <div className='col-md-4'>
              <span className='glyphicon glyphicon-user flex-center' aria-hidden='true' />
              <h3 className='flex-center'>Customized for your style</h3>
            </div>
            <div className='col-md-4'>
              <span className='glyphicon glyphicon-scale flex-center' aria-hidden='true' />
              <h3 className='flex-center'>Designed for accountability</h3>
            </div>
          </div>
          <div className='row call-to-action'>
            <span className='glyphicon glyphicon-time flex-center' aria-hidden='true' />
            <h3>What are you waiting for?</h3>
            <Link to='signup'><button className='btn'><h2>Get started now!</h2></button></Link>
          </div>
        </div>
      </div>
    );
  }
}