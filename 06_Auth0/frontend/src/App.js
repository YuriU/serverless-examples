import React, { Component } from 'react';
import { Auth0Lock } from 'auth0-lock';
import axios from 'axios';
import './App.css';

const API_URL = '<API_URL>';

class App extends Component {
  constructor() {
    super();

    const auth0Configuration = {
      auth: {
        audience: API_URL,
        params: {
          scope: 'openid profile email'
        },
        responseType: 'token'
      }
    };

    const lock = new Auth0Lock(
      '<ClientId>',
      '<Auth0Domain>',
      auth0Configuration
    );

    this.lock = lock;
    this.lock.on('authenticated', this.onAuthentication);
  }

  state = {
      accessToken: null,
      profile: null,
      response: ''
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

  makeRequest = () => {

    const bearerToken = this.state.accessToken;
    axios('/hello', {
      baseURL: API_URL,
      headers: {
        Authorization: bearerToken ? `Bearer ${bearerToken}` : null,
      }
    })
    .then((response)=> {
      this.setState({
        response: response.data.message
      });
    })
    .catch((error) => {
      this.setState({
        response: JSON.stringify(error)
      });
    });
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
        <button onClick={this.makeRequest}>Hello?</button>
        <p>{this.state.response}</p>
      </header>
    </div>
  );
  }
}

export default App;
