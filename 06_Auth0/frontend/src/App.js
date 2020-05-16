import React, { Component } from 'react';
import { Auth0Lock } from 'auth0-lock';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const lock = new Auth0Lock(
      '<ClientId>',
      '<DomainName>'
    );

    this.lock = lock;
    this.lock.on('authenticated', this.onAuthentication);
  }

  state = {
      accessToken: null,
      profile: null
  }

  showLogin = () => {
    this.lock.show();
  }

  logout = () => {

    this.setState({
      accessToken: null,
      profile: null
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    this.lock.logout();
  }

  onAuthentication = (authResult) => {
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {

      if(error){
        return;
      }
 
      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('profile', JSON.stringify(profile));
      this.setState({
        accessToken: authResult.accessToken,
        profile: profile
      });
    });
  }

  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const profile = localStorage.getItem('profile');

    if(accessToken && profile){
      this.setState({
        accessToken: accessToken,
        profile: JSON.parse(profile)
      });
    }


  }

  render() {
    return (<div className="App">
      <header className="App-header">
        {
          this.state.profile 
          ? (
            <div>
              <p>{this.state.profile.name} is logget in</p>
              <button onClick={this.logout}>Logout</button>
            </div>
          )
          : (
            <div>
              <p>User is not logget in</p>
              <button onClick={this.showLogin}>Login</button>
            </div>
            )
        }
      </header>
    </div>
  );
  }
}

export default App;
