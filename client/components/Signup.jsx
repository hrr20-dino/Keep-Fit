import { Link, browserHistory }from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pass: '',
    };

    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handlePassChange(e) {
    this.setState({pass: e.target.value});
  }


  // Submits packaged workout obj to db as x-www-form data.
  signUp(e) {
    e.preventDefault();
    var newUser = {};
    newUser.name = this.state.name;
    newUser.pass = this.state.pass;
    $.post(`/api/signup/`, newUser, function(err, resp) {
      if(err) {
        console.log('Your account cannot be submitted at this time. Already ' +  err);
      } else {
        console.log('The following account has been submitted: ' + resp);
      }
    })
    .done(function(body) {
      window.localStorage.setItem('com.FitKeeper', body.token);
      window.sessionStorage.setItem('user', body.name);
      browserHistory.push(`/dashboard`);
    })

  }




  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 signup-form text-center">
            <h1>Sign up!</h1>
              <div className="col-sm-6 col-sm-offset-3">
                <form>
                  <label className="text-left">Username:
                    <input
                    type='text'
                    placeholder='Username'
                    className="fat-width"
                    onChange={this.handleNameChange}/>
                  </label>
                  <label className="text-left">Password:
                    <input
                    type='password'
                    placeholder='Password'
                    className="fat-width"
                    onChange={this.handlePassChange}/>
                  </label>
                  <button
                  type='submit'
                  value='Sign up'
                  className="btn btn-default margin-top-10"
                  onClick={this.signUp}>Sign Up</button>
                </form>
                <h6>Already a member yet? <Link to='/signin'>Sign in Here!</Link></h6>
              </div>
          </div>
        </div>
      </div>
    )
  };
}



